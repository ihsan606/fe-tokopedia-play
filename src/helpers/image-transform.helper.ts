import {Cloudinary} from "@cloudinary/url-gen";
import { sharpen } from "@cloudinary/url-gen/actions/adjust";
import { outline, blur } from "@cloudinary/url-gen/actions/effect";
import { crop, scale } from "@cloudinary/url-gen/actions/resize";
import { ar16X9 } from "@cloudinary/url-gen/qualifiers/aspectRatio";

export const transformImage = (id: string)=> {
    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dwgmbcmi5'
        }
      }); 

      const image = cld.image(id);
      image.effect(blur(1600)).
       effect(sharpen()).
       resize(scale().
       width(1500)).resize(crop().aspectRatio(ar16X9()))

      const url = image.toURL();

      return url;

}