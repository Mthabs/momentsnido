import { Form } from "react-bootstrap";


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


export const renderTextAreaField = ({ input,  meta, ...custom }) => {
  return (
    <Form.Group>
      <Form.Control as="textarea" {...input} {...custom} />
      {meta.touched && meta.error && <Form.Text className="text-danger">{meta.error}</Form.Text>}
    </Form.Group>
  );
};


export const renderFileField = ({ 
  input, label, meta, image, ...custom }) => {
  return(
    <Form.Group controlId={input.name} className="position-relative my-2">
      <Form.Label><img src={image} alt="Upload" width="45" height="45" className="mr-2" />
    </Form.Label>
    <Form.Control
      type="file"
      name={input.name}
      onChange={(e) => input.onChange(e.target.files[0])}
      isInvalid={meta.touched && meta.error}
    />
  </Form.Group>
)};

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

