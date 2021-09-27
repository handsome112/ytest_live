"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const antd_1 = require("antd");
const react_1 = require("react");
const utils_service_1 = require("@services/utils.service");
const icons_1 = require("@ant-design/icons");
const link_1 = __importDefault(require("next/link"));
const initialData = {
    totalActiveUsers: {
        route: '/users',
        asPath: '/users?status=active',
        title: 'ACTIVE USERS',
        valueStyle: { color: '#ffc107' },
        prefix: <icons_1.LineChartOutlined />,
        query: { status: 'active' }
    },
    totalInactiveUsers: {
        route: '/users',
        asPath: '/users?status=inactive',
        title: 'INACTIVE USERS',
        valueStyle: { color: '#ffc107' },
        prefix: <icons_1.LineChartOutlined />,
        query: { status: 'inactive' }
    },
    totalPendingUsers: {
        route: '/users',
        asPath: '/users?status=pending',
        title: 'PENDING USERS',
        valueStyle: { color: '#ffc107' },
        prefix: <icons_1.LineChartOutlined />,
        query: { status: 'pending' }
    },
    totalActivePerformers: {
        route: '/performer',
        asPath: '/performer?status=active',
        title: 'ACTIVE PERFORMERS',
        valueStyle: { color: '#009688' },
        prefix: <icons_1.LineChartOutlined />,
        query: { status: 'active' }
    },
    totalInactivePerformers: {
        route: '/performer',
        asPath: '/performer?status=inactive',
        title: 'INACTIVE PERFORMERS',
        valueStyle: { color: '#009688' },
        prefix: <icons_1.LineChartOutlined />,
        query: { status: 'inactive' }
    },
    totalPendingPerformers: {
        route: '/performer',
        asPath: '/performer?status=pending',
        title: 'PENDING PERFORMERS',
        valueStyle: { color: '#009688' },
        prefix: <icons_1.LineChartOutlined />,
        query: { status: 'pending' }
    },
    totalActiveStudio: {
        route: '/studios',
        asPath: '/studios?status=active',
        title: 'ACTIVE STUDIO',
        valueStyle: { color: '#ff66b3' },
        prefix: <icons_1.LineChartOutlined />,
        query: { status: 'active' }
    },
    totalInactiveStudio: {
        route: '/studios',
        asPath: '/studios?status=inactive',
        title: 'INACTIVE STUDIO',
        valueStyle: { color: '#ff66b3' },
        prefix: <icons_1.LineChartOutlined />,
        query: { status: 'inactive' }
    },
    totalPendingStudio: {
        route: '/studios',
        asPath: '/studios?status=pending',
        title: 'PENDING STUDIO',
        valueStyle: { color: '#ff66b3' },
        prefix: <icons_1.LineChartOutlined />,
        query: { status: 'pending' }
    },
    totalGalleries: {
        route: '/gallery',
        asPath: '/gallery',
        title: 'GALLERIES',
        valueStyle: { color: '#5399d0' },
        prefix: <icons_1.PieChartOutlined />,
        query: {}
    },
    totalPhotos: {
        route: '/photos',
        asPath: '/photos',
        title: 'PHOTOS',
        valueStyle: { color: '#5399d0' },
        prefix: <icons_1.PieChartOutlined />,
        query: {}
    },
    totalVideos: {
        route: '/video',
        asPath: '/video',
        title: 'VIDEOS',
        valueStyle: { color: '#5399d0' },
        prefix: <icons_1.DotChartOutlined />,
        query: {}
    },
    totalProducts: {
        route: '/product',
        asPath: '/product',
        title: 'PRODUCTS',
        valueStyle: { color: '#5399d0' },
        prefix: <icons_1.PieChartOutlined />,
        query: {}
    },
    totalDeliveriedOrders: {
        route: '/order',
        asPath: '/order',
        title: 'DELIVERIED ORDERS',
        valueStyle: { color: '#c8d841' },
        prefix: <icons_1.AreaChartOutlined />,
        query: {}
    },
    totalShippingdOrders: {
        route: '/order',
        asPath: '/order',
        title: 'SHIPPING ORDERS',
        valueStyle: { color: '#c8d841' },
        prefix: <icons_1.AreaChartOutlined />,
        query: {}
    },
    totalRefundedOrders: {
        route: '/order',
        asPath: '/order',
        title: 'REFUNDED ORDERS',
        valueStyle: { color: '#c8d841' },
        prefix: <icons_1.AreaChartOutlined />,
        query: {}
    },
    totalGrossPrice: {
        route: '/earning',
        asPath: '/earning',
        title: 'GROSS PROFIT',
        valueStyle: { color: '#fb2b2b' },
        prefix: <icons_1.DotChartOutlined />,
        query: {}
    },
    totalNetPrice: {
        route: '/earning',
        asPath: '/earning',
        title: 'NET PROFIT',
        valueStyle: { color: '#fb2b2b' },
        prefix: <icons_1.DotChartOutlined />,
        query: {}
    },
    totalStreamTime: {
        route: '/performer',
        asPath: '/performer',
        title: 'STREAM TIMES',
        valueStyle: { color: '#fb2b2b' },
        prefix: <icons_1.DotChartOutlined />,
        query: {}
    }
};
class Dashboard extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            stats: null
        };
    }
    async componentDidMount() {
        try {
            const stats = await (await utils_service_1.utilsService.statistics()).data;
            if (stats) {
                this.setState({ stats });
            }
        }
        catch (e) {
            console.log(await e);
        }
    }
    render() {
        const { stats } = this.state;
        return (<>
        <head_1.default>
          <title>Dashboard</title>
        </head_1.default>
        <antd_1.Row gutter={24} className="dashboard-stats">
          {stats &&
                Object.keys(initialData).map((key) => (<antd_1.Col span={8}>
                <link_1.default href={{
                        pathname: initialData[key].route,
                        query: initialData[key].query
                    }} as={initialData[key].asPath}>
                  <a>
                    <antd_1.Card>
                      <antd_1.Statistic title={initialData[key].title} value={stats[key] || 0} valueStyle={initialData[key].valueStyle} prefix={initialData[key].prefix}/>
                    </antd_1.Card>
                  </a>
                </link_1.default>
              </antd_1.Col>))}
        </antd_1.Row>
      </>);
    }
}
exports.default = Dashboard;
