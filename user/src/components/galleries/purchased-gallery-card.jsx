"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = __importDefault(require("next/link"));
require("./index.less");
const react_1 = __importDefault(require("react"));
const PurchasedGalleryCard = ({ gallery }) => {
    const { name, coverPhoto, _id } = gallery;
    return (<div className="purchased-gallery-card">
      <div className="purchased-gallery-card-thumb">
        <link_1.default href={{
            pathname: '/photos',
            query: {
                data: JSON.stringify(gallery),
                id: _id
            }
        }} as={`/photos/${_id}`}>
          <a>
            <img src={(coverPhoto === null || coverPhoto === void 0 ? void 0 : coverPhoto.thumbnails) ? coverPhoto.thumbnails[0] : '/gallery.png'} alt=""/>
          </a>
        </link_1.default>
      </div>
      <div className="purchased-gallery-card-name">{name}</div>
    </div>);
};
exports.default = PurchasedGalleryCard;
