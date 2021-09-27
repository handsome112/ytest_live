"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialsForm = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const layout = {
    labelCol: { lg: { span: 4 }, sm: { span: 6 } },
    wrapperCol: { lg: { span: 20 }, sm: { span: 18 } }
};
class SocialsForm extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.formRef = react_1.createRef();
    }
    formRefSubmit() {
        this.formRef.current.submit();
    }
    render() {
        const { socials, onFinish, submiting, } = this.props;
        return (<antd_1.Form ref={this.formRef} {...layout} name="form-performer" onFinish={(values) => {
                onFinish({ socials: values });
            }} onFinishFailed={() => antd_1.message.error('Please complete the required fields')} initialValues={socials
                ? socials
                : ({
                    facebook: 'facebook.com',
                    twitter: 'twitter.com',
                    instagram: 'instagram.com'
                })}>

        <antd_1.Form.Item name="facebook" label="Facebook">
          <antd_1.Input placeholder={socials && socials.facebook || ''}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="twitter" label="Twitter">
          <antd_1.Input placeholder={socials && socials.twitter || ''}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="instagram" label="Instagram">
          <antd_1.Input placeholder={socials && socials.instagram || ''}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item wrapperCol={Object.assign(Object.assign({}, layout.wrapperCol), { offset: 4 })}>
          <antd_1.Button type="primary" htmlType="submit" loading={submiting}>
            Submit
          </antd_1.Button>
        </antd_1.Form.Item>
      </antd_1.Form>);
    }
}
exports.SocialsForm = SocialsForm;
