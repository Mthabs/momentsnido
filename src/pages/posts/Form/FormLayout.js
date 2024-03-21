import { reduxForm, Form } from "redux-form"
import { Field } from "redux-form";
import { renderTextAreaField, renderFileField } from "../../../components/fields";
import { Button } from "react-bootstrap";
import validate from "./validate";

import btnStyles from "../../../styles/Button.module.css";

const FormField = () => {
    return(
        <>
        <Field name = "content" placeholder="What's on your mind?" component={renderTextAreaField} />
        <div className="d-flex">
        <Field name="image" component={renderFileField} image="/upload2.jpg" accept="image/*" label="Upload Image" />
        <Field name="video" component={renderFileField} image="/upload.jpg" accept="video/*" label="Upload Video" />
        </div>
        </>
    )
}

const FormLayout = (props) => {
    const { handleSubmit, pristine, submitting } = props;
    return(
        <Form onSubmit={handleSubmit}>
            <FormField />
            <Button
            className={`${btnStyles.Button} ${btnStyles.Bright} mt-3`}
            type="Submit"
            disabled={pristine || submitting}
            >
            Post
            </Button>  
        </Form>
    )
}
export default reduxForm({
form:"userpost",
destroyOnUnmount:false,
forceUnregisterOnUnmount:false,
validate,
})(FormLayout);