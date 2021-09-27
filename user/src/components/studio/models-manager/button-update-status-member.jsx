"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { studioService } from 'src/services';
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const lib_1 = require("src/lib");
exports.default = ({ member, updateMemberStatus }) => {
    const [processing, setProcessing] = react_1.default.useState(false);
    const handleChangeStatus = async (m) => {
        try {
            // window.confirm
            setProcessing(true);
            // const resp = await studioService.updateMemberStatus(
            //   m._id,
            //   m.status === 'active' ? 'inactive' : 'active'
            // );
            updateMemberStatus(m._id);
            antd_1.message.success('Update Success');
        }
        catch (e) {
            const err = await Promise.resolve(e);
            antd_1.message.error(lib_1.getResponseError(err));
        }
        finally {
            setProcessing(false);
        }
    };
    return (<antd_1.Button type={member.status === 'active' ? 'default' : 'primary'} onClick={() => handleChangeStatus(member)} loading={processing} disabled={processing}>
      {member.status === 'active' ? 'Inactive' : 'Active'}
    </antd_1.Button>);
};
