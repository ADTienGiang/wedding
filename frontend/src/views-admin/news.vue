<template>
    <div class="add-news-container">
      <h2>Thêm Bài Viết Mới</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="title">Tiêu đề:</label>
          <input type="text" id="title" v-model="title" />
        </div>
        <div>
          <label for="duongdanbangtin">Đường dẫn:</label>
          <input type="text" id="duongdanbangtin" v-model="duong_dan_categoryComputed" />
        </div>
        <div>
          <label for="mota">Mô tả:</label>
          <input type="text" id="mota" v-model="mota" />
        </div>
        <div class="row row-content">
          <div class="col-md-8">
            <label for="content">Nội dung:</label>
            <textarea id="content" v-model="content"></textarea>
          </div>
          <div class="col-md-4">
            <div>
              <label for="upload">
                <input type="file" id="upload" multiple @change="handleFileChange" accept="image/*">
               
              </label>
            </div>
            <div class="files">
              <h2>Hình đã chọn</h2>
              <ul>
                <li v-for="(file, index) in filesArr" :key="index">
                  <!-- tôi chọn file mới ở đây, nhưng hàm update không thể in ra được -->
                  <img :src="file.url" alt="Selected File" class="file-image" style="width: 100px;" />
                  <span class="file-size">{{ getFileSize(file.size) }}</span>
                  <i class='bx bx-message-square-x' @click="removeFile(index)"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <button type="submit">Thêm</button>
      </form>

    </div>
  <div class="table-container news">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Tiêu đề</th>
          <th>Hình ảnh</th>
          <th>Mô tả</th>
          <th>Nội dung</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="news in News" :key="news.id">
          <td>
            <div class="noidungnews">{{ news.title }}</div>
          </td>
          <td>
            <div class="image-container">
              <div class="image-list" :class="{ 'overflow-hidden': news.Imgs.length > 3 }">
                <div v-for="(imageUrl, index) in news.Imgs.slice(0, 3)" :key="index" class="image-item">
                  <img :src="imageUrl.url" alt="">
                </div>
              </div>
            </div>
          </td>
          <td>
            <div class="noidungnews">{{ news.mota }}</div>
          </td>
          <td >
            <div class="noidungnews" v-html="news.content"></div>
          </td>
          <td class="thaotac">
            <a type="button" data-bs-toggle="modal" data-bs-target="#exampleModalDetailImgs">
              <i class="bx bx-images hinhanhviewsadmin" @click="openProductModal(product)"></i>
            </a>
            <a type="button" data-bs-toggle="modal" data-bs-target="#exampleModaledit">
              <i class="bx bx-edit-alt iconmomodalchinhsuasp" @click="sendata(news)"></i>
            </a>
            <a @click="deleteProduct(product.id)">
              <i class='bx bxs-coffee-togo thungrac'></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="modal  fade modal-xl" id="exampleModaledit" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Sửa bài viết</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updateProduct">
            <div class="form-group">
              <div class="preview">
                https://domain.com/{{ duong_dan_categoryComputed }}
              </div>
              <label for="duongdanmau">Đường dẫn bài viết(link không được trùng)</label>
              <input type="text" class="form-control" id="duongdanmau" v-model="duong_dan_categoryComputed" />
            </div>
            <div class="row row-content">
              <div class="col-md-12"><label>Tiêu đề bài viết</label>
                <input type="text" placeholder="Tiêu đề bài viết" class="form-control" v-model="title">
              </div>
              <div v-if="selectedProduct" class="d-flex hinhanhadminchinhsua">
                <div v-for="(imageUrl, index) in selectedProduct.Imgs" :key="index">
                  <img :src="imageUrl.url" alt="" style="width: 80px; height: 80px; margin: 10px;">
                  <div class="remove_img_modal" @click="removeImage(imageUrl.id)">
                    <i class='bx bxs-x-square'></i>
                  </div>
                </div>
              </div>
              <div>
                <label for="upload">
                  <input type="file" id="upload" multiple @change="handleFileChange" accept="image/*">
                
                </label>
              </div>
              <div class="files">
                <h2>Hình đã chọn</h2>
                <ul>
                  <li v-for="(file, index) in filesArr" :key="index">
                    <img :src="file.url" alt="Selected File" class="file-image" style="width: 100px;" />
                    <span class="file-size">{{ getFileSize(file.size) }}</span>
                    <i class='bx bx-message-square-x' @click="removeFile(index)"></i>
                  </li>
                </ul>
              </div>
              <div class="col-md-12">
                <label for="currency-field">Mô tả</label>
                <input type="text" name="currency-field" id="currency-field" placeholder="Mô tả" class="form-control"
                  v-model="mota">
              </div>
              <div class="col-md-12">
                <label for="content">Nội dung:</label>
                <textarea id="textarea" v-model="content"></textarea>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary" @click="updateProduct()">cập nhật</button>
        </div>
      </div>
    </div>
  </div>
  <toast ref="toast"></toast>
</template>

<script>
import toast from '../components/toast.vue';
export default {
  // async mounted() {
  //   await this.getNews();
  //   const self = this;
  //   tinymce.init({
  //     selector: 'textarea',
  //     plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
  //     toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
  //     tinycomments_mode: 'embedded',
  //     tinycomments_author: 'Author name',
  //     mergetags_list: [
  //       { value: 'First.Name', title: 'First Name' },
  //       { value: 'Email', title: 'Email' },
  //     ],
  //     ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
  //     // Dưới đây là danh sách tất cả các thuộc tính của TinyMCE
  //     branding: false, // Tắt branding
  //     menubar: 'file edit view insert format tools table tc help',
  //     height: 500, // Chiều cao của trình soạn thảo
  //     width: '100%', // Chiều rộng của trình soạn thảo
  //     language: 'vi', // Ngôn ngữ
  //     skin: 'oxide-dark', // Giao diện
  //     content_css: 'dark.css', // CSS cho nội dung
  //     resize: 'both', // Điều chỉnh kích thước
  //     branding: false, // Tắt branding TinyMCE
  //     autosave_ask_before_unload: true, // Hỏi trước khi thoát khi có dữ liệu không được lưu
  //     autosave_interval: '20s', // Khoảng thời gian tự động lưu
  //     paste_data_images: true, // Cho phép dán hình ảnh từ clipboard
  //     // ... và nhiều thuộc tính khác
  //     setup(editor) {
  //       // Xử lý sự kiện change trong TinyMCE
  //       editor.on('change', () => {
  //         // Cập nhật biến content với nội dung từ TinyMCE
  //         self.content = editor.getContent();
  //       });
  //     },
  //   });
  // },
  data() {
    return {
      title: '',
      mota: '',
      content: '',
      duongdanbangtin: '',
      url: '',
      avatar: '',
      filesArr: [],
      News: [],
      selectedProduct: '',
      id : '',

    };
  },
  components: {
    toast,
  },
  // mounted() {
  //   this.getNews();

  // },
  computed: {
    // Hàm tính toán để biến đổi tên danh mục thành đường dẫn
    duong_dan_categoryComputed() {
      return this.convertToSlug(this.title);
    },
  },
  methods: {
    async submitForm() {
      if (!this.title) {
        this.$refs.toast.showToast('chưa nhập tiêu đề');
        return;
      } else if (!this.mota) {
        this.$refs.toast.showToast('chưa nhập mô tả');
        return;
      } else if (!this.content) {
        this.$refs.toast.showToast('chưa nhập nội dung');
        return;
      } else if (this.avatar.length === 0) {
        this.$refs.toast.showToast('chưa chọn thumbnail cho bảng tin.');
        return;
      }
      const formData = new FormData();
      console.log(this.avatar.length);
      for (let i = 0; i < this.avatar.length; i++) {
        const file = this.avatar[i];
        formData.append('avatar', file);
      }
      formData.append('title', this.title);
      formData.append('content', this.content);
      formData.append('mota', this.mota);
      formData.append('duongdanbangtin', this.duong_dan_categoryComputed);
      formData.append('url', this.url);
      try {
        const productadd = await this.$axios.post(
          'AddNews',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          }
        );
        tinymce.get('content').setContent('');
        this.$refs.toast.showToast(productadd.data.message);
        this.getNews();
        this.title='';
        this.avatar ='';
        this.mota = '';
        this.duong_dan_categoryComputed = '';
        this.url = '';
        this.filesArr = [];
      } catch (error) {
        console.error('Lỗi khi thêm sản phẩm:', error);
      }
    },
    async updateProduct() {
      if (!this.title) {
        this.$refs.toast.showToast('không được bỏ trống tiêu đề');
        return;
      } else if (!this.mota) {
        this.$refs.toast.showToast('chưa nhập mô tả');
        return;
      } else if (!this.content) {
        this.$refs.toast.showToast('chưa nhập nội dung');
        return;
      }
        const formData = new FormData();
        // Thêm hình ảnh mới nếu có
        if (this.avatar && this.avatar.length > 0) {
          for (let i = 0; i < this.avatar.length; i++) {
            const file = this.avatar[i];
            formData.append('avatar', file);
          }
        }
        formData.append('title', this.title);
        formData.append('content', this.content);
        formData.append('mota', this.mota);
        formData.append('duongdanbangtin', this.duong_dan_categoryComputed);
        formData.append('url', this.url);
        try {
          const productupdate = await this.$axios.put(
            'updateNews/' + this.id,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );

          this.$refs.toast.showToast(productupdate.data.message);
          this.getNews();
        } catch (error) {
          console.error('Lỗi khi cập nhật bảng tin:', error);
        }
      },
    async getNews() {
      try {
        const result = await this.$axios.get(
          `getAllNews`
        );
        this.News = result.data;
      } catch (e) {
        console.log(e);
      }
    },
    handleFileChange(event) {
      const files = event.target.files;
      this.avatar = files;

      const filesArr = Array.from(files);

      // Lặp qua danh sách các tệp để tạo URL cho từng tệp
      for (let i = 0; i < filesArr.length; i++) {
        const file = filesArr[i];
        file.url = URL.createObjectURL(file); // Thêm thuộc tính url vào tệp
      }

      this.filesArr = filesArr;
    },
    getFileSize(size) {
      let suffix = "bytes";
      if (size >= 1024 && size < 1024000) {
        suffix = "KB";
        size = Math.round((size / 1024) * 100) / 100;
      } else if (size >= 1024000) {
        suffix = "MB";
        size = Math.round((size / 1024000) * 100) / 100;
      }
      return `${size} ${suffix}`;
    },
    removeFile(index) {
      // Giải phóng URL của tệp khi xóa
      URL.revokeObjectURL(this.filesArr[index].url);
      this.filesArr.splice(index, 1);
    },
    convertToSlug(text) {
      text = text.toLowerCase();
      text = text.replace(/[àáảãạăắằẳẵặâấầẩẫậ]/g, 'a');
      text = text.replace(/[èéẻẽẹêếềểễệ]/g, 'e');
      text = text.replace(/[ìíỉĩị]/g, 'i');
      text = text.replace(/[òóỏõọôốồổỗộơớờởỡợ]/g, 'o');
      text = text.replace(/[ùúủũụưứừửữự]/g, 'u');
      text = text.replace(/[ỳýỷỹỵ]/g, 'y');
      text = text.replace(/[đ]/g, 'd');
      text = text.replace(/\s+/g, '-');
      text = text.replace(/[^\w\s-]/g, '');
      return text;
    },
    sendata(product) {
      this.id = product.id;
      this.selectedProduct = product;
      this.title = product.title;
      this.mota = product.mota;
      this.content = product.content; // Đặt nội dung từ sản phẩm vào biến content
      // Sử dụng tinymce để cập nhật nội dung trên trình soạn thảo
      tinymce.get('textarea').setContent(this.content);
    },
    async removeImage(imageId) {
      console.log(imageId);
      if (this.selectedProduct && this.selectedProduct.Imgs) {
        const index = this.selectedProduct.Imgs.findIndex(image => image.id === imageId);

        if (index !== -1) {
          // Sử dụng splice để xóa hình ảnh khỏi mảng
          this.selectedProduct.Imgs.splice(index, 1);

          // Gửi yêu cầu HTTP để xóa hình ảnh khỏi cơ sở dữ liệu
          await this.$axios.delete(`deleteImageNews/${imageId}`)
            .then((response) => {
              this.$refs.toast.showToast(response.data.message);
            })
            .catch((error) => {
              console.error('Lỗi khi xóa hình ảnh:', error);
            });
        }
      }
    },
    getFileSize(size) {
      let suffix = "bytes";
      if (size >= 1024 && size < 1024000) {
        suffix = "KB";
        size = Math.round((size / 1024) * 100) / 100;
      } else if (size >= 1024000) {
        suffix = "MB";
        size = Math.round((size / 1024000) * 100) / 100;
      }
      return `${size} ${suffix}`;
    },
  },
}
</script>

