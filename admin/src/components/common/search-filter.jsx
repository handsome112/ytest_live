"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchFilter = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const select_performer_dropdown_1 = require("@components/performer/common/select-performer-dropdown");
const select_user_dropdown_1 = require("@components/user/select-user-dropdown");
const select_gallery_dropdown_1 = require("@components/gallery/common/select-gallery-dropdown");
const select_studio_dropdown_1 = require("@components/studio/select-studio.dropdown");
class SearchFilter extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            q: '',
            performerId: '',
            studioId: '',
            targetId: '',
            galleryId: ''
        };
    }
    componentDidMount() {
        if (this.props.performerId) {
            this.setState({ performerId: this.props.performerId });
        }
    }
    render() {
        const { statuses = [], searchWithPerformer, performerId, galleryId, searchWithGallery, notWithKeyWord, sourceType = [], withDatePicker, loading, setDateRanger, searchWithUser, userId, searchWithStudio, studioId } = this.props;
        return (<antd_1.Row gutter={24}>
        {!notWithKeyWord && (<antd_1.Col xl={{ span: 4 }} md={{ span: 8 }}>
            <antd_1.Input placeholder="Enter keyword" onChange={(evt) => this.setState({ q: evt.target.value })} onPressEnter={() => this.props.onSubmit(this.state)}/>
          </antd_1.Col>)}
        {statuses.length ? (<antd_1.Col xl={{ span: 4 }} md={{ span: 8 }}>
            <antd_1.Select onChange={(val) => this.setState({ status: val })} style={{ width: '100%' }} placeholder="Select status" defaultValue="">
              {statuses.map((s) => (<antd_1.Select.Option key={s.key} value={s.key}>
                  {s.text || s.key}
                </antd_1.Select.Option>))}
            </antd_1.Select>
          </antd_1.Col>) : null}
        {sourceType.length ? (<antd_1.Col xl={{ span: 4 }} md={{ span: 8 }}>
            <antd_1.Select onChange={(val) => this.setState({ sourceType: val })} style={{ width: '100%' }} placeholder="Select Type" defaultValue="">
              {sourceType.map((s) => (<antd_1.Select.Option key={s.key} value={s.key}>
                  {s.text || s.key}
                </antd_1.Select.Option>))}
            </antd_1.Select>
          </antd_1.Col>) : null}
        {searchWithUser && (<antd_1.Col xl={{ span: 6 }} md={{ span: 8 }}>
            <select_user_dropdown_1.SelectUserDropdown placeholder={'Search user'} style={{ width: '100%' }} onSelect={(val) => this.setState({ sourceId: val || '' })} defaultValue={userId || ''}/>
          </antd_1.Col>)}
        {searchWithPerformer && (<antd_1.Col xl={{ span: 6 }} md={{ span: 8 }}>
            <select_performer_dropdown_1.SelectPerformerDropdown placeholder={'Search performer'} style={{ width: '100%' }} onSelect={(val) => this.setState({ performerId: val || '', studioId: '' })} defaultValue={performerId || ''}/>
          </antd_1.Col>)}
        {searchWithGallery && (<antd_1.Col xl={{ span: 6 }} md={{ span: 8 }}>
            <select_gallery_dropdown_1.SelectGalleryDropdown placeholder={'Search gallery'} style={{ width: '100%' }} onSelect={(val) => this.setState({ galleryId: val || '' })} defaultValue={galleryId || ''} isQuery={true}/>
          </antd_1.Col>)}
        {searchWithStudio && (<antd_1.Col xl={{ span: 6 }} md={{ span: 8 }}>
            <select_studio_dropdown_1.SelectStudioDropdown placeholder={'Search studio'} style={{ width: '100%' }} onSelect={(val) => this.setState({ targetId: val || '', studioId: val || '', performerId: '' })} defaultValue={studioId || ''}/>
          </antd_1.Col>)}
        {withDatePicker && (<antd_1.Col xl={{ span: 6 }} md={12} xs={24}>
            <div>
              <antd_1.DatePicker.RangePicker disabledDate={() => loading} onCalendarChange={setDateRanger.bind(this)}/>
            </div>
          </antd_1.Col>)}
        <antd_1.Col xl={{ span: 4 }} md={{ span: 8 }}>
          <antd_1.Button type="primary" onClick={() => this.props.onSubmit(this.state)}>
            Search
          </antd_1.Button>
        </antd_1.Col>
      </antd_1.Row>);
    }
}
exports.SearchFilter = SearchFilter;
