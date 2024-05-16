<template>
  <h2>Quản lý sản phẩm</h2>
  <a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="setDefault"><i
      class="fa-solid fa-circle-plus"></i> <span>Thêm sản phẩm</span></a>
  <div class="table-container">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Tên sản phẩm</th>
          <th>Giá</th>
          <th>Giảm giá</th>
          <th>Giá hiển thị</th>
          <th>Mô tả</th>
          <th>Trạng thái</th>
          <th>Hình ảnh</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>
            <div class="max-width-td">{{ product.tenSanPhamGas }}</div>
          </td>
          <td>
            <!-- Kiểm tra nếu giá không phải là 0 -->
            <span v-if="product.gia !== '0'">{{ formatCurrency(product.gia) }}</span>
            <!-- Nếu giá là 0, hiển thị 'Liên hệ' -->
            <span v-else>Liên hệ</span>
          </td>

          <td>
            <!-- Kiểm tra nếu giảm giá không phải là 0 -->
            <span v-if="product.giamGia !== '0'">{{ product.giamGia }}%</span>
            <!-- Nếu giảm giá là 0, hiển thị 'Liên hệ' -->
            <span v-else>Liên hệ</span>
          </td>

          <td>
            <!-- Kiểm tra nếu giá sau khi giảm không phải là 0 -->
            <span v-if="product.discountedPrice !== '0'">{{ formatCurrency(product.discountedPrice) }}</span>
            <!-- Nếu giá sau khi giảm là 0, hiển thị 'Liên hệ' -->
            <span v-else>Liên hệ</span>
          </td>

          <td>
            <div class="noidungchitietsanphamadmin" v-html="product.moTa"></div>
          </td>
          <td>{{ product.trangThai }}</td>

          <td>
            <div class="image-container">
              <div class="image-list" :class="{ 'overflow-hidden': product.images.length > 3 }">
                <div v-for="(imageUrl, index) in product.images.slice(0, 3)" :key="index" class="image-item">
                  <img :src="imageUrl.url" alt="">
                </div>
              </div>
            </div>
          </td>
          <td class="thaotac">
            <a type="button" data-bs-toggle="modal" data-bs-target="#exampleModalDetailImgs">
              <i class="bx bx-images hinhanhviewsadmin" @click="openProductModal(product)"></i>
            </a>
            <a type="button" data-bs-toggle="modal" data-bs-target="#exampleModaledit">
              <i class="bx bx-edit-alt iconmomodalchinhsuasp" @click="sendata(product)"></i>
            </a>
            <a @click="deleteProduct(product.id)">
              <i class='bx bxs-coffee-togo thungrac'></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <toast ref="toast"></toast>

  <!-- Add Modal HTML -->

  <div class="modal fade modal-xl" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addProduct">
            <div class="form-group">
              <div class="preview">
                https://domain.com/{{ duong_dan_categoryComputed }}
              </div>
              <label for="duongdanmau">Đường dẫn sản phẩm(link không được trùng)</label>
              <input type="text" class="form-control" id="duongdanmau" v-model="duong_dan_categoryComputed" disabled />
            </div>
            <div class="row row-content">
              <div class="col-md-4"><label>Tên sản phẩm</label>
                <input type="text" placeholder="Tên sản phẩm" class="form-control" v-model="tenSanPhamGas">
              </div>
              <div class="col-md-4">
                <label>Trạng thái</label>
                <select class="form-control" v-model="trangThai">
                  <option value="Còn hàng">Còn hàng</option>
                  <option value="Hết hàng">Hết hàng</option>
                </select>
              </div>

              <div class="col-md-4">
                <label for="cat_id">Danh mục</label>
                <br>
                <select id="cat_id" v-model="maDanhMuc" required>
                  <option disabled>Chọn danh mục</option>
                  <option v-for="catsex in category" :key="catsex.id" :value="catsex.id">{{ catsex.tenDanhMuc }}
                  </option>
                </select>
                <br>
              </div>
            </div>
            <div class="row row-content">
              <div class="col-md-4">
                <label for="currency-field">Giá sản phẩm</label>
                <input type="text" name="currency-field" id="currency-field" placeholder="Giá sản phẩm"
                  class="form-control" v-model="formattedPrice" @input="updatePrice($event)" @blur="savePrice">

              </div>
              <div class="col-md-4">
                <label>Giảm giá (%)</label>
                <input type="number" min="0" placeholder="%" class="form-control" v-model="discount"
                  @input="calculateDiscountedPrice">
              </div>
              <div class="col-md-4">
                <label>Giá sau khi giảm</label>
                <input type="number" placeholder="Giá đã giảm" class="form-control" v-model="discountedPrice" disabled>
              </div>
            </div>
            <div class="form-group">
              <label>Mô tả</label>
              <div class="form-group">
                <textarea id="textareaAdd" v-model="mota"></textarea>
              </div>
            </div>
            <div class="form-group row-content">
              <div>
                <label for="upload">
                  <input type="file" id="upload" multiple @change="handleFileChange" accept="image/*">
                  Chọn hình ảnh (tối đa 20 ảnh)
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
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary" @click="addProduct()">Thêm</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Modal HTML -->
  <div class="modal  fade modal-xl" id="exampleModaledit" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Sửa sản phẩm</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updateProduct">
            <div class="form-group">
              <div class="preview">
                https://domain.com/{{ duong_dan_categoryComputed }}
              </div>
              <label for="duongdanmau">Đường dẫn sản phẩm(link không được trùng)</label>
              <input type="text" class="form-control" id="duongdanmau" v-model="duong_dan_categoryComputed" disabled />
            </div>
            <div class="row row-content">
              <div class="col-md-4"><label>Tên sản phẩm</label>
                <input type="text" placeholder="Tên sản phẩm" class="form-control" v-model="tenSanPhamGas">
              </div>
              <div class="col-md-4">
                <label>Trạng thái</label>
                <select class="form-control" v-model="trangThai">
                  <option value="Còn hàng">Còn hàng</option>
                  <option value="Hết hàng">Hết hàng</option>
                </select>
              </div>
              <div class="col-md-4">
                <label for="cat_id">Danh mục</label>
                <br>
                <select id="cat_id" v-model="maDanhMuc" required>
                  <option disabled>Chọn danh mục</option>
                  <option v-for="catsex in category" :key="catsex.id" :value="catsex.id">{{ catsex.tenDanhMuc }}
                  </option>
                </select>
                <br>
              </div>
              <div class="col-md-3">
                <label for="currency-field">Giá sản phẩm</label>
                <input type="text" name="currency-field" id="currency-field" placeholder="Giá sản phẩm"
                  class="form-control" v-model="formattedPrice" @input="updatePrice($event)" @blur="savePrice">
              </div>

              <div class="col-md-3">
                <label>Giảm giá (%)</label>
                <input type="number" min="0" placeholder="%" class="form-control" v-model="discount"
                  @input="calculateDiscountedPrice">
              </div>
              <div class="col-md-3">
                <label>Giá sau khi giảm</label>
                <input type="text" placeholder="Giá đã giảm" class="form-control" v-model="discountedPrice" disabled>
              </div>
            </div>
            <div class="form-group">
              <label>Mô tả</label>
              <div class="form-group">
                <textarea id="textareaEdit" v-model="mota"></textarea>
              </div>
            </div>

            <div v-if="selectedProduct" class="d-flex hinhanhadminchinhsua">
              <div v-for="(imageUrl, index) in selectedProduct.images" :key="index">
                <img :src="imageUrl.url" alt="" style="width: 80px; height: 80px; margin: 10px;">
                <div class="remove_img_modal" @click="removeImage(imageUrl.id)">
                  <i class='bx bxs-x-square'></i>
                </div>
              </div>
            </div>
            <div>
              <label for="upload">
                <input type="file" id="upload" multiple @change="handleFileChange" accept="image/*">
                Chọn hình ảnh (tối đa 20 ảnh)
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
          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary" @click="updateProduct()">cập nhật</button>
        </div>
      </div>
    </div>
  </div>

  
  <div class="modal modal-transparent fade modal-xl" id="exampleModalDetailImgs" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Hiển thị chi tiết sản phẩm -->
          <div v-if="selectedProduct">
            <!-- Thêm các thông tin khác của sản phẩm -->
            <div class="row">
              <div v-for="(imageUrl, index) in selectedProduct.images" :key="index" class="col-4 hinhanhchitietxemthem">
                <img :src="imageUrl.url" alt="" @click="openLargeImage(imageUrl)">
              </div>
            </div>
          </div>
          <!-- Hiển thị ảnh lớn -->
          <div class="large-image-container" @click="closeLargeImage" v-if="largeImageVisible">
            <div class="full-screen-container">
              <span class="arrow prev" @click="showPreviousImage">&#9664;</span>
              <img class="large-image" :src="largeImageUrl.url" alt="Large Image" @click="preventClose">
              <span class="arrow next" @click="showNextImage">&#9654;</span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { Swiper, SwiperSlide } from 'swiper/vue';
import toast from '../components/toast.vue';
import { vModelCheckbox } from 'vue';
export default
  {
    // async mounted() {

    //   // await this.getNews();
    //   const self = this;
    //   tinymce.init({
    //     selector: '#textareaAdd',
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
    //         self.mota = editor.getContent();
    //       });
    //     },
    //   });
    //   tinymce.init({
    //     selector: '#textareaEdit',
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
    //         self.mota = editor.getContent();
    //       });
    //     },
    //   });
    //   await this.getcategory();
    //   await this.getProducts();
    // },
    data() {
      return {

        maDanhMuc: '',
        category: '',
        products: [],
        trangThai: '',
        tenSanPhamGas: '',
        duongdanmau: '',
        quantity: '',
        price: 0,
        lienhe: '',
        discount: 0,
        discountedPrice: 0,
        formattedPrice: '',
        mota: '',
        url: '',
        avatar: '',
        id: '',
        selectedProduct: null,
        largeImageVisible: false,
        largeImageUrl: '',
        images: [],
        files: [],
        filesArr: [],
        allImages: [],
      }
    },

    components: {
    
      toast,
    },
    computed: {
      duong_dan_categoryComputed() {
        return this.convertToSlug(this.tenSanPhamGas);
      },
    },
    methods: {

      mergeImages() {
        this.allImages = [...this.selectedProduct.images, ...this.filesArr.map(file => file.url)];
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
        this.mergeImages(); // Gộp hình ảnh cũ và mới
      },
      removeFile(index) {
        // Giải phóng URL của tệp khi xóa
        URL.revokeObjectURL(this.filesArr[index].url);
        this.filesArr.splice(index, 1);
      },
      onFileSelected(event) {
        const files = event.target.files;
        this.avatar = files;
      },
      async removeImage(imageId) {
        console.log(imageId);

        if (this.selectedProduct && this.selectedProduct.images) {
          const index = this.selectedProduct.images.findIndex(image => image.id === imageId);

          if (index !== -1) {
            // Sử dụng splice để xóa hình ảnh khỏi mảng
            this.selectedProduct.images.splice(index, 1);

            // Gửi yêu cầu HTTP để xóa hình ảnh khỏi cơ sở dữ liệu
            await this.$axios.delete(`deleteImage/${imageId}`)
              .then((response) => {
                this.$refs.toast.showToast(response.data.message);
              })
              .catch((error) => {
                console.error('Lỗi khi xóa hình ảnh:', error);
              });
          }
        }
      },
      removeNewImage(index) {
        this.newImages.splice(index, 1);
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
      showPreviousImage() {
        event.stopPropagation();
        const currentIndex = this.selectedProduct.images.indexOf(this.largeImageUrl);
        if (currentIndex > 0) {
          this.largeImageUrl = this.selectedProduct.images[currentIndex - 1];
        }
      },
      formatNumber(n) {
        return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
      updatePrice(event) {
        let inputVal = event.target.value;
        let originalPrice = inputVal;

        // Kiểm tra xem chuỗi đã được định dạng thành một số chưa
        if (!isNaN(parseFloat(inputVal))) {
          // Nếu là một số, loại bỏ dấu phẩy
          originalPrice = inputVal.replace(/,/g, '');
        }

        // Cập nhật giá trị đã định dạng và giá trị gốc
        const formattedPrice = this.formatNumber(originalPrice);
        this.formattedPrice = formattedPrice;
        this.price = originalPrice;
      },
      calculateDiscountedPrice() {
        const discountAmount = (this.discount / 100) * this.price;
        this.discountedPrice = this.price - discountAmount;
        // Đảm bảo giá sau khi giảm được định dạng lại và hiển thị
        this.discountedPrice = this.formatNumber(this.discountedPrice);
      },


      savePrice() {
      },
      showNextImage() {
        event.stopPropagation();
        const currentIndex = this.selectedProduct.images.indexOf(this.largeImageUrl);
        if (currentIndex < this.selectedProduct.images.length - 1) {
          this.largeImageUrl = this.selectedProduct.images[currentIndex + 1];
        }
      },
      openLargeImage(imageUrl) {
        this.largeImageUrl = imageUrl;
        this.largeImageVisible = true;
      },
      preventClose(event) {
        event.stopPropagation(); // Ngăn chặn sự kiện click lan rộng lên modal cha
      },
      closeLargeImage() {
        this.largeImageVisible = false;
      },
      openProductModal(product) {
        this.selectedProduct = product; // Lưu sản phẩm được chọn vào biến selectedProduct
      },
      async getcategory() {
        try {
          const result = await this.$axios.get(
            `getcat`
          );
          this.category = result.data;
          console.log(this.category)
        } catch (e) {
          console.log(e);
        }
      },
      async getProducts() {
        try {
          const result = await this.$axios.get(`getProduct`);
          this.products = result.data;
        } catch (error) {
          console.log(error);
        }
      },
      parseInformation(information) {
        try {
          const parsedInfo = JSON.parse(information);
          return parsedInfo;
        } catch (error) {
          console.error('Lỗi khi phân tích thông tin JSON từ trường information:', error);
          return {}; // Trả về một đối tượng rỗng nếu có lỗi
        }
      },
      sendata(product) {
        this.selectedProduct = product;
        this.id = product.id;
        this.tenSanPhamGas = product.tenSanPhamGas;
        this.formattedPrice = product.gia;
        this.duongdanmau = product.duong_dan_san_pham;
        this.price = parseInt(product.gia);
        this.discount = parseInt(product.giamGia);
        this.discountedPrice = product.discountedPrice;
        this.maDanhMuc = product.maDanhMuc;
        this.mota = product.moTa;
        this.trangThai = product.trangThai;
        tinymce.get('textareaEdit').setContent(this.mota);


      },
      setDefault() {
        this.name = '';
        this.quantity = '';
        this.price = '';
        this.discountedPrice = 0;
        this.discount = 0;
        this.maDanhMuc = '';
        this.url = '';
        this.avatar = '';
        this.formattedPrice = '';
        this.filesArr = [];
      },
      formatCurrency(value) {
        let val = (value / 1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đ'
      },
      async addProduct() {

        if (!this.maDanhMuc) {
          this.$refs.toast.showToast('chưa chọn danh mục');
          return;
        } else if (!this.tenSanPhamGas) {
          this.$refs.toast.showToast('chưa nhập tên sản phẩm');
          return;
        } else if (this.avatar.length === 0) {
          this.$refs.toast.showToast('chọn ít nhất 1 hình ảnh cho sản phẩm');
          return;
        } else if (!this.trangThai) {
          this.$refs.toast.showToast('chưa chọn trạng thái');
          return;
        }
        else if (!this.discount) {
          this.discount = 0;
        } else if (!this.mota) {
          this.$refs.toast.showToast('chưa nhập nội dung');
          return;
        }
        if (this.price === '') {
          this.price = 0;
        }
        const discountPercentage = parseFloat(this.discount);
        this.discountedPrice = this.price - (this.price * discountPercentage) / 100;
        const formData = new FormData();
        console.log(this.avatar.length);
        for (let i = 0; i < this.avatar.length; i++) {
          const file = this.avatar[i];
          formData.append('avatar', file);
        }
        formData.append('maDanhMuc', this.maDanhMuc);
        formData.append('duong_dan_san_pham', this.duong_dan_categoryComputed);
        formData.append('tenSanPhamGas', this.tenSanPhamGas);
        formData.append('gia', this.price);
        formData.append('trangThai', this.trangThai);
        formData.append('giamGia', this.discount);
        formData.append('discountedPrice', this.discountedPrice);
        formData.append('lienHe', this.lienhe);
        formData.append('moTa', this.mota);
        console.log(formData);
        try {
          const productadd = await this.$axios.post(
            'addProduct',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              },
            }
          );

          this.$refs.toast.showToast(productadd.data.message);
          this.getProducts();
        } catch (error) {
          console.error('Lỗi khi thêm sản phẩm:', error);
        }
      },
      async getNews() {
        console.log('11')
        try {
          const result = await this.$axios.get(
            `getAllNews`
          );
          this.News = result.data;
        } catch (e) {
          console.log(e);
        }
      },
      async updateProduct() {
        console.log(this.trangThai)

        if (!this.maDanhMuc) {
          this.$refs.toast.showToast('chưa chọn danh mục');
          return;
        } else if (!this.tenSanPhamGas) {
          this.$refs.toast.showToast('chưa nhập tên sản phẩm');
          return;
        } else if (!this.discount) {
          this.discount = 0;
        }
        else if (!this.trangThai) {
          this.$refs.toast.showToast('chưa chọn trạng thái');
          return;
        } else if (this.price === '') {
          this.price = 0;
        } else if (!this.mota) {
          this.$refs.toast.showToast('chưa nhập nội dung');
          return;
        }

        if (this.price === '') {
          this.price = 0;
        }
        const discountPercentage = parseFloat(this.discount);
        this.discountedPrice = this.price - (this.price * discountPercentage) / 100;
        const formData = new FormData();
        if (this.avatar && this.avatar.length > 0) {
          for (let i = 0; i < this.avatar.length; i++) {
            const file = this.avatar[i];
            formData.append('avatar', file);
          }
        }
        formData.append('maDanhMuc', this.maDanhMuc);
        formData.append('duong_dan_san_pham', this.duong_dan_categoryComputed);
        formData.append('tenSanPhamGas', this.tenSanPhamGas);
        formData.append('gia', this.price);
        formData.append('giamGia', this.discount);
        formData.append('discountedPrice', this.discountedPrice);
        formData.append('lienHe', this.lienhe);
        formData.append('moTa', this.mota);
        formData.append('trangThai', this.trangThai);
        console.log(this.id)
        try {
          const productupdate = await this.$axios.put(
            'updateProduct/' + this.id,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          this.$refs.toast.showToast(productupdate.data.message);
          this.getProducts();
        } catch (error) {
          console.error('Lỗi khi cập nhật sản phẩm:', error);
        }
      },
      async deleteProduct(id) {
        // Sử dụng hộp thoại xác nhận
        const userConfirmed = confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");

        // Kiểm tra xem người dùng đã xác nhận hay chưa
        if (userConfirmed) {
          try {
            const productdelete = await this.$axios.delete(
              `deleteProduct/` + id
            );
            this.$refs.toast.showToast(productdelete.data.message);
            this.getProducts();
          } catch (error) {
            console.error(error);
            // Xử lý lỗi nếu có
          }
        } else {
          // Người dùng đã hủy xóa sản phẩm
        }
      }
    },
  }
</script>
<style scoped>
.image-container {
  width: 100%;
  overflow: hidden;
}

.image-list {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
}

.image-item {
  flex: 0 0 auto;
  margin-right: 10px;
}

.modal-transparent .modal-content {
  background-color: rgba(33, 31, 31, 0.7);
}

.large-image-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.large-image {
  width: 1000px;
  height: 700px;
  max-width: 90%;
  max-height: 90%;
  border: 2px solid #fff;
  cursor: zoom-in;
}

.preview {
  background-color: #f0f0f0;
  padding: 5px;
  border: 1px solid #ccc;
  margin-top: -30px;
  display: block;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  text-align: center;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  cursor: pointer;
  z-index: 1000;
}

.prev {
  left: 20px;
  color: blue;
}

.next {
  right: 20px;
  color: blue;
}

.arrow {
  font-size: 24px;
  color: white;
  cursor: pointer;
  padding: 20px;
}

.large-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  margin: 0 auto;
  display: block;
}

::placeholder {
  font-size: 14px;
  font-weight: 400;
}

.btn-close {
  background-color: #f0f0f0;
}

@media (max-width: 768px) {
  .hinhanhadminchinhsua {
    margin-bottom: 10px;
    width: 300px;
    overflow-x: auto;
  }

  .large-image {
    width: 250px;
    height: 250px;
  }
}

.form-check {
  margin-top: 20px;
}
</style>