import  Form  from "react-bootstrap/Form";

export const renderTextField = ({
  input,
  required,
  label,
  placeholder,
  help_text,
  meta,
  disabled,
}) => {
  return (
    <Form.Group
      className={meta.touched && meta.error ? "my-1 text-danger" : "my-1"}
    >
      <Form.Label
        style={{ fontWeight: 500, color: 'purple' }}
        htmlFor={input.name}
        className="form-label"
      >
        {label} {required && <span className="text-danger fw-bold">*</span>}
      </Form.Label>
      <Form.Control
        type="text"
        id={input.name}
        name={input.name}
        className={meta.touched ? (meta.error ? "is-invalid" : "is-valid") : ""}
        placeholder={placeholder}
        value={input.value}
        onChange={input.onChange}
        disabled={disabled}
      />
      <div className="small">{help_text}</div>
      {meta.touched && meta.error && (
        <div className="text-danger">{meta.error}</div>
      )}
    </Form.Group>
  );
};

export const renderCheckBoxField = ({ input, label, meta }) => {
  return (
    <Form.Group className="my-1">
      <Form.Control
        type="checkbox"
        id={input.name}
        name={input.name}
        onChange={input.onChange}
        className={meta.touched ? (meta.error ? "is-invalid" : "is-valid") : ""}
      />

      <Form.Label
        style={{ fontWeight: 400 }}
        htmlFor={input.name}
        className={
          meta.touched && meta.error
            ? "form-check-label mx-2 text-danger"
            : "form-check-label mx-2"
        }
      >
        {label}
      </Form.Label>
    </Form.Group>
  );
};

export const renderSelectField = ({
  input,
  required,
  label,
  options,
  help_text,
  meta,
  disabled,
}) => {
  return (
    <Form.Group className="my-1">
      <Form.Label
        style={{ fontWeight: 500 }}
        htmlFor={input.name}
        className={
          meta.touched && meta.error
            ? "form-label text-left text-danger"
            : "form-label text-left"
        }
      >
        {label} {required && <span className="text-danger fw-bold">*</span>}
      </Form.Label>
      <Form.Control
        type="select"
        name={input.name}
        id={input.named}
        className={meta.touched ? (meta.error ? "is-invalid" : "is-valid") : ""}
        onChange={input.onChange}
        value={input.value}
        disabled={disabled}
      >
        <option key="" value="">
          Choose an Option
        </option>
        {options &&
          options.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            );
          })}
      </Form.Control>
      <div className="small">{help_text}</div>
      {meta.touched && meta.error && (
        <div className="text-danger">{meta.error}</div>
      )}
    </Form.Group>
  );
};

export const renderIntegerField = ({
  input,
  required,
  label,
  placeholder,
  help_text,
  post,
  pre,
  meta,
  disabled,
}) => {
  return (
    <>
      <Form.Group className="my-1">
        <Form.Label
          style={{ fontWeight: 500 }}
          htmlFor={input.name}
          className={
            meta.touched && meta.error ? "form-label text-danger" : "form-label"
          }
        >
          {label} {required && <span class="text-danger fw-bold">*</span>}
        </Form.Label>
        <div className="input-group">
          {pre && <span className="input-group-text">{pre}</span>}
          <Form.Control
            type="number"
            id={input.name}
            name={input.name}
            className={
              meta.touched ? (meta.error ? "is-invalid" : "is-valid") : ""
            }
            placeholder={placeholder}
            value={input.value}
            onChange={input.onChange}
            disabled={disabled}
          />
          {post && <span className="input-group-text">{post}</span>}
        </div>
        <div className="small">{help_text}</div>
        {meta.touched && meta.error && (
          <div className="text-danger">{meta.error}</div>
        )}
      </Form.Group>
    </>
  );
};

export const renderFileField = ({
  input,
  required,
  label,
  help_text,
  meta,
}) => {
  return (
    <>
      <Form.Group
        className={meta.touched && meta.error ? "my-1 text-danger" : "my-1"}
      >
        <Form.Label
          style={{ fontWeight: 500 }}
          htmlFor={input.name}
          className="form-label"
        >
          {label} {required && <span className="text-danger fw-bold">*</span>}
        </Form.Label>
        <Form.Control
          type="file"
          id={input.name}
          name={input.name}
          onChange={input.onChange}
        />
        <div className="small">{help_text}</div>
        {meta.touched && meta.error && (
          <div className="text-danger">{meta.error}</div>
        )}
      </Form.Group>
    </>
  );
};

export const renderEmailField = ({
  input,
  required,
  label,
  placeholder,
  help_text,
  meta,
}) => {
  return (
    <Form.Group className="my-1">
      <Form.Label
        style={{ fontWeight: 500, color: 'purple' }}
        htmlFor={input.name}
        className={
          meta.touched && meta.error ? "form-label text-danger" : "form-label"
        }
      >
        {label} {required && <span className="text-danger fw-bold">*</span>}
      </Form.Label>
      <Form.Control
        type="email"
        id={input.name}
        name={input.name}
        placeholder={placeholder}
        value={input.value}
        onChange={input.onChange}
        className={meta.touched ? (meta.error ? "is-invalid" : "is-valid") : ""}
      />
      <div className="small">{help_text}</div>
      {meta.touched && meta.error && (
        <div className="text-danger">{meta.error}</div>
      )}
    </Form.Group>
  );
};

export const renderPasswordField = ({
  input,
  meta,
  label,
  placeholder,
  help_text,
  required,
}) => {
  return (
    <Form.Group className="my-1">
      <Form.Label
        style={{ fontWeight: 500, color: 'purple' }}
        htmlFor={input.name}
        className={
          meta.touched && meta.error
            ? "form-label text-left text-danger"
            : "form-label text-left"
        }
      >
        {label} {required && <span className="text-danger fw-bold">*</span>}
      </Form.Label>
      <Form.Control
        className={meta.touched ? (meta.error ? "is-invalid" : "is-valid") : ""}
        type="password"
        id={input.name}
        name={input.name}
        placeholder={placeholder}
        value={input.value}
        onChange={input.onChange}
      />
      <div className="small">{help_text}</div>
      {meta.touched && meta.error && (
        <div className="text-danger">{meta.error}</div>
      )}
    </Form.Group>
  );
};

export const renderDateField = ({
  input,
  meta,
  label,
  placeholder,
  help_text,
  required,
}) => {
  return (
    <Form.Group className="my-1">
      <Form.Label
        style={{ fontWeight: 500 }}
        htmlFor={input.name}
        className={
          meta.touched && meta.error
            ? "form-label text-left text-danger"
            : "form-label text-left"
        }
      >
        {label} {required && <span className="text-danger fw-bold">*</span>}
      </Form.Label>
      <Form.Control
        className={meta.touched ? (meta.error ? "is-invalid" : "is-valid") : ""}
        type="date"
        id={input.name}
        name={input.name}
        placeholder={placeholder}
        value={input.value}
        onChange={input.onChange}
      />
      <div className="small">{help_text}</div>
      {meta.touched && meta.error && (
        <div className="text-danger">{meta.error}</div>
      )}
    </Form.Group>
  );
};