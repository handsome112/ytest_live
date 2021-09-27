"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE = void 0;
/* eslint-disable no-shadow */
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const services_1 = require("src/services");
const utils_1 = require("@lib/utils");
var ROLE;
(function (ROLE) {
    ROLE["PERFORMER"] = "perfomrer";
    ROLE["USER"] = "user";
    ROLE["STUDIO"] = "studio";
})(ROLE = exports.ROLE || (exports.ROLE = {}));
const DataMap = [
    { lable: 'Tip Commission', key: 'tipCommission' },
    { lable: 'Private Call Commission', key: 'privateCallCommission' },
    { lable: 'Group Call Commission', key: 'groupCallCommission' },
    { lable: 'Product Commission', key: 'productCommission' },
    { lable: 'Gallery Commission', key: 'albumCommission' },
    { lable: 'Video Commission', key: 'videoCommission' }
];
const style = {
    headStyle: {
        color: '#ff0066'
    },
    bodyStyle: {
        color: '#000000'
    }
};
const CommissionCard = ({ role }) => {
    const [commission, setCommission] = react_1.default.useState(null);
    react_1.default.useEffect(() => {
        const getCommission = async () => {
            try {
                const resp = role === ROLE.STUDIO
                    ? await services_1.studioService.getCommission()
                    : await services_1.performerService.getCommission();
                setCommission(resp.data);
            }
            catch (e) {
                const err = await Promise.resolve(e);
                antd_1.message.error(utils_1.getResponseError(err));
            }
        };
        getCommission();
    }, []);
    return (<>
      {commission
            && (typeof commission === 'number' ? (<antd_1.Row>
            <antd_1.Col xs={24} sm={6}>
              <antd_1.Card {...style} title={<span>Commission</span>} extra={(<span style={{ color: '#ff0066' }}>
                    {commission}
                    %
                  </span>)}>
                Hint: When a member spends paid tokens with you, you will get
                this commission.
              </antd_1.Card>
            </antd_1.Col>
          </antd_1.Row>) : (<antd_1.Row gutter={[10, 10]}>
            {DataMap.map((m) => (<antd_1.Col xs={24} sm={8} key={m.key}>
                <antd_1.Card {...style} title={<span>{m.lable}</span>} extra={(<span style={{ color: '#ff0066' }}>
                      {commission[m.key]}
                      %
                    </span>)}>
                  Hint: When a member spends paid tokens with you, you will get
                  this commission.
                </antd_1.Card>
              </antd_1.Col>))}
          </antd_1.Row>))}
    </>);
};
CommissionCard.defaultProps = {
    role: ''
};
exports.default = CommissionCard;
