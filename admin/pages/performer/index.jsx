"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
const antd_1 = require("antd");
const page_1 = __importDefault(require("@components/common/layout/page"));
const performer_service_1 = require("@services/performer.service");
const search_filter_1 = require("@components/performer/search-filter");
const icons_1 = require("@ant-design/icons");
const date_1 = require("@lib/date");
const common_1 = require("@components/common");
const utils_1 = require("@lib/utils");
class Performers extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            pagination: {},
            searching: false,
            list: [],
            limit: 10,
            filter: {},
            sortBy: 'updatedAt',
            sort: 'desc',
            showModal: false,
            pickedPerformer: null
        };
    }
    static async getInitialProps({ ctx }) {
        return ctx.query;
    }
    componentDidMount() {
        this.search();
    }
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.search();
        }
    }
    async search(page = 1) {
        try {
            const { studioId, status } = this.props;
            let { filter } = this.state;
            await this.setState({ searching: true });
            const query = Object.assign(Object.assign({}, filter), { limit: this.state.limit, offset: (page - 1) * this.state.limit, sort: this.state.sort, sortBy: this.state.sortBy });
            if (studioId) {
                query.studioId = studioId;
            }
            ;
            if (status) {
                query.status = status;
            }
            const resp = await performer_service_1.performerService.search(query);
            if (studioId) {
                filter = Object.assign(Object.assign({}, filter), { studioId });
            }
            if (status) {
                filter = Object.assign(Object.assign({}, filter), { status });
            }
            await this.setState({
                filter,
                searching: false,
                list: resp.data.data,
                pagination: Object.assign(Object.assign({}, this.state.pagination), { total: resp.data.total })
            });
        }
        catch (e) {
            antd_1.message.error('An error occurred, please try again!');
            this.setState({ searching: false });
        }
    }
    async handleTableChange(pagination, filters, sorter) {
        const { sort } = this.state;
        const pager = Object.assign({}, this.state.pagination);
        pager.current = pagination.current;
        await this.setState({
            pagination: pager,
            sortBy: sorter.field || 'updatedAt',
            sort: sorter.order ? (sorter.order === 'descend' ? 'desc' : 'asc') : sort
        });
        this.search(pager.current);
    }
    async handleFilter(filter) {
        await this.setState({ filter });
        this.search();
    }
    async onExportCsv(filter) {
        try {
            const page = 1;
            await this.setState({ filter });
            const url = performer_service_1.performerService.exportCsv(Object.assign(Object.assign({ limit: this.state.limit, offset: (page - 1) * this.state.limit }, this.state.filter), { sort: this.state.sort, sortBy: this.state.sortBy }));
            const resp = (await utils_1.downloadCsv(url, 'performers_export.csv'));
            if (resp && resp.success) {
                return antd_1.message.success('Downloading, please check in Download folder');
            }
        }
        catch (error) {
            return antd_1.message.error('An error occurred, please try again!');
        }
    }
    // showModal(performer: IPerformer) {
    //   this.setState({ showModal: true, pickedPerformer: performer });
    // }
    render() {
        const { list, searching, pagination, pickedPerformer, showModal } = this.state;
        const showPerformerStats = (performer) => {
            this.setState({ showModal: true, pickedPerformer: performer });
        };
        const closeModal = () => {
            this.setState({ showModal: false });
        };
        const PerformerStats = () => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            return (<antd_1.Modal title={`${pickedPerformer.username}'s Stats`} visible={this.state.showModal} 
            // footer={[
            //   <Button type="primary" onClick={closeModal}>
            //     Close
            //   </Button>
            // ]}
            footer={null} onCancel={closeModal}>
          <p>Total Favorites: {(_a = pickedPerformer === null || pickedPerformer === void 0 ? void 0 : pickedPerformer.stats) === null || _a === void 0 ? void 0 : _a.favorites}</p>
          <p>Total Views: {(_b = pickedPerformer === null || pickedPerformer === void 0 ? void 0 : pickedPerformer.stats) === null || _b === void 0 ? void 0 : _b.views}</p>
          <p>Total Galleries: {(_c = pickedPerformer === null || pickedPerformer === void 0 ? void 0 : pickedPerformer.stats) === null || _c === void 0 ? void 0 : _c.totalGalleries}</p>
          <p>Total Photos: {(_d = pickedPerformer === null || pickedPerformer === void 0 ? void 0 : pickedPerformer.stats) === null || _d === void 0 ? void 0 : _d.totalPhotos}</p>
          <p>Total Videos: {(_e = pickedPerformer === null || pickedPerformer === void 0 ? void 0 : pickedPerformer.stats) === null || _e === void 0 ? void 0 : _e.totalVideos}</p>
          <p>Total Products: {(_f = pickedPerformer === null || pickedPerformer === void 0 ? void 0 : pickedPerformer.stats) === null || _f === void 0 ? void 0 : _f.totalProducts}</p>
          <p>
            Total Stream Time (HH:mm:ss):{' '}
            {date_1.convertMiliSecsToSecs(((_g = pickedPerformer === null || pickedPerformer === void 0 ? void 0 : pickedPerformer.stats) === null || _g === void 0 ? void 0 : _g.totalStreamTime) || 0)}
          </p>
          <p>Total Tokens Earned: {(_h = pickedPerformer === null || pickedPerformer === void 0 ? void 0 : pickedPerformer.stats) === null || _h === void 0 ? void 0 : _h.totalTokenEarned}</p>
          <p>Total Tokens Spent: {(_j = pickedPerformer === null || pickedPerformer === void 0 ? void 0 : pickedPerformer.stats) === null || _j === void 0 ? void 0 : _j.totalTokenSpent}</p>
        </antd_1.Modal>);
        };
        const columns = [
            {
                title: 'First name',
                dataIndex: 'firstName',
                sorter: true
            },
            {
                title: 'Last name',
                dataIndex: 'lastName',
                sorter: true
            },
            {
                title: 'Username',
                dataIndex: 'username',
                sorter: true
            },
            {
                title: 'Studio',
                dataIndex: 'studioInfo',
                render: (studioInfo) => (studioInfo === null || studioInfo === void 0 ? void 0 : studioInfo.name) || 'N/A'
            },
            {
                title: 'Email',
                dataIndex: 'email',
                sorter: true
            },
            {
                title: 'Gender',
                dataIndex: 'gender',
                sorter: true,
                render(gender) {
                    return <antd_1.Tag color="orange">{gender}</antd_1.Tag>;
                }
            },
            {
                title: 'Stats',
                key: 'performerStats',
                render(_, record) {
                    return (<icons_1.EyeOutlined onClick={() => {
                            showPerformerStats(record);
                        }}/>);
                }
            },
            {
                title: 'Email Verified',
                dataIndex: 'emailVerified',
                render(emailVerified) {
                    switch (emailVerified) {
                        case true:
                            return <antd_1.Tag color="green">Y</antd_1.Tag>;
                        case false:
                            return <antd_1.Tag color="red">N</antd_1.Tag>;
                    }
                    return <antd_1.Tag color="default">{emailVerified}</antd_1.Tag>;
                }
            },
            {
                title: 'Status',
                dataIndex: 'status',
                render(status) {
                    switch (status) {
                        case 'active':
                            return <antd_1.Tag color="green">Active</antd_1.Tag>;
                        case 'inactive':
                            return <antd_1.Tag color="red">Inactive</antd_1.Tag>;
                        case 'pending-email-confirmation':
                            return <antd_1.Tag color="default">Pending</antd_1.Tag>;
                    }
                    return <antd_1.Tag color="default">{status}</antd_1.Tag>;
                }
            },
            {
                title: 'CreatedAt',
                dataIndex: 'createdAt',
                sorter: true,
                render(date) {
                    return <span>{date_1.formatDate(date)}</span>;
                }
            },
            {
                title: 'Actions',
                dataIndex: '_id',
                render(id) {
                    return (<common_1.DropdownAction menuOptions={[
                            {
                                key: 'update',
                                name: 'Update',
                                children: (<link_1.default href={{
                                        pathname: '/performer/update',
                                        query: { id }
                                    }} as={`/performer/update?id=${id}`}>
                      <a>
                        <icons_1.EditOutlined /> Update
                      </a>
                    </link_1.default>)
                            },
                            {
                                key: 'photo',
                                name: 'Photos',
                                children: (<link_1.default href={{
                                        pathname: '/photos',
                                        query: { performerId: id }
                                    }} as={`/photos?performerId=${id}`}>
                      <a>
                        <icons_1.CameraOutlined /> Photos
                      </a>
                    </link_1.default>)
                            },
                            {
                                key: 'gallery',
                                name: 'Galleries',
                                children: (<link_1.default href={{
                                        pathname: '/gallery',
                                        query: { performerId: id }
                                    }} as={`/gallery?performerId=${id}`}>
                      <a>
                        <icons_1.FileImageOutlined /> Galleries
                      </a>
                    </link_1.default>)
                            },
                            {
                                key: 'video',
                                name: 'Videos',
                                children: (<link_1.default href={{
                                        pathname: '/video',
                                        query: { performerId: id }
                                    }} as={`/video?performerId=${id}`}>
                      <a>
                        <icons_1.VideoCameraOutlined /> Videos
                      </a>
                    </link_1.default>)
                            },
                            {
                                key: 'product',
                                name: 'Products',
                                children: (<link_1.default href={{
                                        pathname: '/product',
                                        query: { performerId: id }
                                    }} as={`/product?performerId=${id}`}>
                      <a>
                        <icons_1.SkinOutlined /> Products
                      </a>
                    </link_1.default>)
                            }
                        ]}/>);
                }
            }
        ];
        return (<react_1.Fragment>
        <head_1.default>
          <title>Performers</title>
        </head_1.default>
        <common_1.BreadcrumbComponent breadcrumbs={[{ title: 'Performers' }]}/>
        <page_1.default>
          <search_filter_1.SearchFilter onSubmit={this.handleFilter.bind(this)} onExportCsv={this.onExportCsv.bind(this)}/>
          <div style={{ marginBottom: '20px' }}></div>
          <antd_1.Table dataSource={list} columns={columns} rowKey="_id" loading={searching} pagination={pagination} onChange={this.handleTableChange.bind(this)} scroll={{ x: 1500, y: 650 }}/>
          {showModal && <PerformerStats />}
        </page_1.default>
      </react_1.Fragment>);
    }
}
exports.default = Performers;
