import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { view } from "@risingstack/react-easy-state";
import React from "react";
import errors from "../../store/errors";

const clearError = () => {
  errors.error = "";
};

const Error = view(() => {
  const { code, description, message } = errors.error || {};

  const isAccessDenied = code === 403;

  const isBadRequest = code >= 500 || description?.includes("Network Error");

  if (isBadRequest) {
    return (
      <Dialog open={Boolean(errors.error)}>
        <DialogTitle>Error</DialogTitle>

        <DialogContent>
          <div className="text-base">
            <p className="mb-3">Запрос обрабатывается очень долго.</p>

            <p className="mb-3">Убедитесь, что вы подключены к Интернету.</p>

            {code > -1 && <p className="mb-0">Код: {code}</p>}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={clearError} color="primary" variant="contained">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  if (code === 0) {
    return (
      <Dialog open={Boolean(errors.error)}>
        <DialogTitle>{message}</DialogTitle>

        <DialogContent>
          {description && (
            <p dangerouslySetInnerHTML={{ __html: description }} />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={clearError} color="primary" variant="contained">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  if (isAccessDenied) {
    return (
      <Dialog open={Boolean(errors.error)}>
        <DialogTitle>В доступе отказано</DialogTitle>
        <DialogActions>
          <Button onClick={clearError} color="primary" variant="contained">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={Boolean(errors.error)}>
      <DialogTitle>{code && message ? message : "Ошибка"}</DialogTitle>

      <DialogContent>
        <div>
          {description && (
            <p dangerouslySetInnerHTML={{ __html: description }} />
          )}
          {code > -1 && <p className="mb-0">Код: {code}</p>}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={clearError} color="primary" variant="contained">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default Error;
