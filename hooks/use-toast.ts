import * as React from 'react';

type ToastProps = {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
};

type ToastState = {
  toasts: (ToastProps & { id: string })[];
};

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 5000;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

type Action =
  | { type: 'ADD_TOAST'; toast: ToastProps & { id: string } }
  | { type: 'REMOVE_TOAST'; toastId: string };

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

function reducer(state: ToastState, action: Action): ToastState {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
}

const listeners: Array<(state: ToastState) => void> = [];

let memoryState: ToastState = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

function toast(props: ToastProps) {
  const id = genId();

  const update = (props: ToastProps) =>
    dispatch({
      type: 'ADD_TOAST',
      toast: {
        ...props,
        id,
      },
    });

  const dismiss = () => dispatch({ type: 'REMOVE_TOAST', toastId: id });

  update(props);

  toastTimeouts.set(
    id,
    setTimeout(() => {
      dismiss();
      toastTimeouts.delete(id);
    }, TOAST_REMOVE_DELAY)
  );

  return {
    id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState<ToastState>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => {
      if (toastId) {
        dispatch({ type: 'REMOVE_TOAST', toastId });
      }
    },
  };
}

export { useToast, toast };
