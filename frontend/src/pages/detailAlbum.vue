<template>
  <div id="full">
    <header1 />
    <div class="wrap-main  w-clear">
      <div class="wrap-album w-clear" v-if="alBumDetail">
        <div class="content-main-right baonoidung w-clear">
          <div class="info-top">
            <router-link to="/hanh-trinh" title="Album" class="to-cpt-list">
                <i class='bx bx-photo-album'></i> ALbum
            </router-link>

          </div>
          <h1 class="title-main"><span>{{ alBumDetail.tenchude }} </span></h1>
          <div class="content-album">
            <p>{{ alBumDetail.mota }}</p>
            <p v-for="a in alBumDetail.nhacungcap">{{ a.nhacungcap }}: <a :href="a.linksocialnhacungcap" role="link"
                tabindex="0">{{ a.tennhacung }}</a></p>
          </div>
        </div>
        <div class="box-photo">
          <div class="masonry-grid" ref="masonry">
            <div v-for="image in alBumDetail.hinhanhchitiethanhtrinh" :key="image.id" class="grid-item item_project">
              <div class="proj">
                <a class="pic-photo" data-fancybox="gallery" :href="image.duongDan" :title="alBumDetail.tenchude">
                  <img :src="image.duongDan" :alt="image.alt">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer1 />
  </div>

</template>
<script>
import Masonry from 'masonry-layout'
import header1 from '../components/header.vue';
import footer1 from '../components/footer.vue';
import imagesLoaded from 'imagesloaded';
import { RouterLink } from 'vue-router';

export default {
  data() {
    return {
      images: [
        {
          id: 1,
          full: '/src/assets/upload/news/1-3639.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/1-3639.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 2,
          full: '/src/assets/upload/news/2-9123.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/2-9123.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 3,
          full: '/src/assets/upload/news/2-9123.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/3-8510.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 4,
          full: '/src/assets/upload/news/4-8921.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/4-8921.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 5,
          full: '/src/assets/upload/news/5-4255.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/5-4255.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 6,
          full: '/src/assets/upload/news/6-4473.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/6-4473.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 7,
          full: '/src/assets/upload/news/7-1072.png',
          thumb: '/src/assets/upload/news/7-1072.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 8,
          full: '/src/assets/upload/news/8-6286.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/8-6286.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 9,
          full: '/src/assets/upload/news/9-8854.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/9-8854.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 10,
          full: '/src/assets/thumbs/315x0x3/upload/news/8-6286.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/10-8782.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 11,
          full: '/src/assets/upload/news/10-8782.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/10-8782.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 12,
          full: '/src/assets/upload/news/11-6873.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/11-6873.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 13,
          full: '/src/assets/upload/news/12-7024.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/12-7024.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 14,
          full: '/src/assets/upload/news/13-2949.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/13-2949.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 15,
          full: '/src/assets/upload/news/14-7938.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/14-7938.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 16,
          full: '/src/assets/upload/news/15-9314.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/15-9314.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 17,
          full: '/src/assets/upload/news/16-2719.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/16-2719.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 18,
          full: '/src/assets/upload/news/17-8473.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/17-8473.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 19,
          full: '/src/assets/upload/news/18-5092.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/18-5092.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 20,
          full: '/src/assets/upload/news/19-9279.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/19-9279.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 21,
          full: '/src/assets/upload/news/20-9457.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/20-9457.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 22,
          full: '/src/assets/upload/news/21-8337.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/21-8337.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 23,
          full: '/src/assets/upload/news/22-3600.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/22-3600.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 24,
          full: '/src/assets/upload/news/23-5937.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/23-5937.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 25,
          full: '/src/assets/upload/news/24-3692.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/24-3692.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        }, {
          id: 26,
          full: '/src/assets/upload/news/25-2260.png',
          thumb: '/src/assets/thumbs/315x0x3/upload/news/25-2260.png',
          alt: 'Mô tả hình ảnh',
          title: 'Tiêu đề ảnh'
        },
      ],
      album: [],
      category: [],
      alBumDetail: null,

    };
  },
  components: {
    header1,
    footer1
  },
  async created() {
    await this.getAlbum();
    await this.getcategory();
  },
  methods: {
    async getAlbum() {
      try {
        const path = this.$route.params.duongdanhanhtrinh;
        const response = await this.$axios.get('getAlbum');
        this.alBumDetail = response.data.find(service => service.duongdanhanhtrinh === path);
        console.log(this.alBumDetail)

      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ server', error);
        this.$refs.toast.showToast('Lỗi khi lấy dữ liệu');
      }
    },
    async getcategory() {
      try {
        const result = await this.$axios.get(
          `getAllCat`
        );
        this.category = result.data;
        console.log(this.category)
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      const grid = this.$refs.masonry;
      imagesLoaded(grid, () => {
        this.masonry = new Masonry(grid, {
          itemSelector: '.grid-item',
          columnWidth: 200,
          gutter: 0,
          fitWidth: true,
        });
      });
    });
  },
  beforeDestroy() {
    if (this.masonry) {
      this.masonry.destroy();
    }
  }
};
</script>

<style scoped>
.masonry-item img {
  width: 100%;
  height: auto;
  display: block;
}

@media (max-width: 1200px) {
  .masonry-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .masonry-grid {
    grid-template-columns: 1fr;
  }
}

.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 0;
}

.masonry-item img {
  width: 100%;
  display: block;
  object-fit: cover;
  margin: 0;
  padding: 0;
}

.grid-item {
  margin: 0;
  padding: 0;
}

.grid-item img {
  width: 100%;
  display: block;
  margin: 0;
  padding: 0;
}

.grid-item {
  padding: 5px;
}
button {
  background-color: antiquewhite;
}
button:hover{
  background-color: none;
}
</style>