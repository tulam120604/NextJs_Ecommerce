'use client';


export default function Config_color (item : any) {

  let class_css;
    if (item === 'Black' || item === 'Đen') {
      class_css = 'bg-black'
    }
    else if (item === 'Red' || item === 'Đỏ') {
      class_css = 'bg-red-500'
    }
    else if (item === 'Yellow' || item === 'Vàng') {
      class_css = 'bg-yellow-500'
    }
    else if (item === 'Brow' || item === 'Nâu') {
      class_css = 'bg-brow-500'
    }
    else if (item === 'Violet' || item === 'Tím') {
      class_css = 'bg-violet-500'
    }
    else if (item === 'Green' || item === 'Xanh lá') {
      class_css = 'bg-green-500'
    }
    else if (item === 'Blue' || item === 'Xanh trời') {
      class_css = 'bg-blue-500'
    }
    else {
      class_css = 'bg-white border border-black'
    }

      return class_css
}