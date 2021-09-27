"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Description = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const numberformat_1 = __importDefault(require("@components/common/layout/numberformat"));
const ListItem = ({ description, title }) => (<antd_1.List.Item>
    <antd_1.Row style={{ width: '100%' }}>
      <antd_1.Col className="light-text" sm={{ span: 6 }} xs={{ span: 12 }}>
        {title}
      </antd_1.Col>
      <antd_1.Col style={{ fontWeight: 'bold' }} sm={{ span: 18 }} xs={{ span: 12 }}>
        {description}
      </antd_1.Col>
    </antd_1.Row>
  </antd_1.List.Item>);
let interval;
const Description = ({ roomJoined, receivedToken }) => {
    const [callTime, setCallTime] = react_1.useState(0);
    react_1.useEffect(() => {
        if (roomJoined) {
            interval = setInterval(() => {
                setCallTime(callTime + 1);
            }, 60 * 1000);
        }
        else {
            setCallTime(0);
            interval && clearInterval(interval);
        }
    }, [roomJoined]);
    const dataSource = [
        {
            title: 'Call time',
            description: `${callTime} minute(s)`
        },
        {
            title: 'Status',
            description: roomJoined ? 'Live' : ''
        },
        {
            title: 'Received Token',
            description: <numberformat_1.default value={receivedToken} suffix=" token(s)"/>
        }
    ];
    return (<antd_1.List dataSource={dataSource} renderItem={(item) => (<ListItem description={item.description} title={item.title}/>)}/>);
};
exports.Description = Description;
