<template>
  <h3>Banner hiện tại</h3>
  <div class="form-container">
    <div class="banner-container">
      <div :class="{ 'banner-item active': index === 0, 'banner-item': index !== 0 }">
        <div class="banner-remove" @click="removeBanner(this.id)">
          <i class='bx bxs-x-square'></i>
        </div>
        <img class="banner-image" :src="this.banner" />
      </div>
    </div>
  </div>
  <div class="form-container">
    <form @submit.prevent="submitForm">

      <div class="form-group">
        <label for="upload" class="upload-label">
          <input type="file" id="upload" multiple @change="handleFileChangeBanner" accept="image/*">
          Chọn hình ảnh
        </label>
      </div>
      <div class="selected-files">
        <h2>Hình đã chọn</h2>
        <ul>
          <li class="file-item" v-for="(file, index) in filesArr" :key="index">
            <img class="selected-image" :src="getFileUrl(file)" alt="Selected File" />
            <span class="file-size">{{ getFileSize(file.size) }}</span>
            <i class='bx bx-message-square-x' @click="removeFileBanner(index)"></i>
          </li>
        </ul>
      </div>
      <div class="form-group">
        <label for="title">Tiêu đề:</label>
        <input type="text" id="title" v-model="tieude" class="form-input" placeholder="Nhập tiêu đề">
      </div>
      <div class="form-group">
        <label for="service">Giới thiệu về dịch vụ:</label>
        <textarea rows="4" cols="50" type="text" id="service" v-model="gioithieu" class="form-input"
          placeholder="Nhập tên Giới thiệu về dịch vụ"></textarea>
      </div>
      <input type="submit" value="Lưu" class="submit-button" />
    </form>
  </div>
  <div class="banner-management">
    <h2>Quản lý dịch vụ</h2>
    <a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
      @click="setDefault"><i class="fa-solid fa-circle-plus"></i> <span>Thêm wedding</span></a>
    <div class="form-container">
      <div class="table-container">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Banner</th>
              <th>Tên dịch vụ</th>
              <th>Mô tả dịch vụ</th>
              <th>Các gói dịch vụ</th>
              <th>Hình ảnh</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(wd, index) in service" :key="index">
              <td>
                <div>{{ wd.id }}</div>
              </td>
              <td>
                <div class="max-width-td"><img :src="wd.banner" alt="Hình ảnh part"></div>
              </td>
              <td>
                <div class="max-width-td">{{ wd.tendichvu }}</div>
              </td>
              <td>
                <div class="max-width-td">{{ wd.mota }}</div>
              </td>
              <td>
                <div class="max-width-td">
                  <ul>
                    <li v-for="package1 in wd.cacgoidichvu" :key="package1.id">
                      {{ package1.tengoidichvu }}
                    </li>
                  </ul>
                </div>
              </td>

              <td>
                <div class="image-container">
                  <div class="image-list">
                    <div class="image-item">
                      <img v-for="image in wd.hinhanhchitietdichvu" :src="image.duongDan"
                        :alt="`Hình ảnh chi tiết ${index}`" class="detail-image">
                    </div>
                  </div>
                </div>
              </td>
              <td class="thaotac">

                <a type="button" data-bs-toggle="modal" data-bs-target="#exampleModaledit">
                  <i class="bx bx-edit-alt iconmomodalchinhsuasp" @click="sendata(wd)"></i>
                </a>
                <a>
                  <i class='bx bxs-coffee-togo thungrac'></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Add Modal HTML -->
  <div class="modal fade modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm dịch vụ mới</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <div class="preview">
              https://domain.com/{{ duongdanchitiet }}
            </div>
            <label for="duongdanmau">Đường dẫn (link không được trùng)</label>
            <input type="text" class="form-control" id="duongdanmau" v-model="duongdanchitiet" disabled />
          </div>
          <div class="form-group">
            <label for="tendichvu">Tên dịch vụ</label>
            <input type="text" class="form-control" id="tendichvu" v-model="tendichvu" />
          </div>
          <div class="form-group row-content">
            <label for="theloai">thumbnail 2x3</label>

            <div>
              <label for="upload">
                <input type="file" id="upload" @change="handleFileChangeThumbnail" accept="image/*">
              </label>
            </div>
            <div class="files">
              <ul>
                <li v-for="(file, index) in filesArrThumbnail" :key="index">
                  <img class="file-image" :src="getFileUrl(file)" alt="Selected File" style="width: 100px;" />
                  <span class="file-size">{{ getFileSize(file.size) }}</span>
                  <i class='bx bx-message-square-x' @click="removeFileThumbnail(index)"></i>
                </li>
              </ul>
            </div>
          </div>
          <div class="form-group">
            <label for="mota">Mô tả</label>
            <textarea type="text" class="form-control" id="mota" v-model="mota"></textarea>
          </div>
          <div class="form-group">
            <label for="tengoidichvu">Các gói, hạng mục</label>
            <div v-for="(item, index) in goidichvu" :key="index">
              <input type="text" class="form-control" v-model="item.tengoidichvu" />
              <button class="btn btn-secondary" @click="removeGoiDichVu(index)">Xóa</button>
            </div>
            <button @click="addGoiDichVu" class="btn btn-secondary">Thêm gói/hạng mục mới</button>
          </div>
          <div class="form-group row-content">
            <label for="theloai">Hình ảnh danh mục</label>
            <div>
              <label for="upload">
                <input type="file" id="upload" @change="handleFileChangeService" accept="image/*" multiple>
              </label>
            </div>
            <div class="files">
              <ul>
                <li v-for="(file, index) in filesArrService" :key="index">
                  <img class="file-image" :src="file.url" alt="Selected File" style="width: 100px;" />
                  <span class="file-size">{{ getFileSize(file.size) }}</span>
                  <i class='bx bx-message-square-x' @click="removeFileService(index)"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary" @click="addService()">Thêm</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Edit Modal HTML -->
  <div class="modal fade modal" id="exampleModaledit" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm dịch vụ mới</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <div class="preview">
              https://domain.com/{{ duongdanchitiet }}
            </div>
            <label for="duongdanmau">Đường dẫn (link không được trùng)</label>
            <input type="text" class="form-control" id="duongdanmau" v-model="duongdanchitiet" disabled />
          </div>
          <div class="form-group">
            <label for="tendichvu">Tên dịch vụ</label>
            <input type="text" class="form-control" id="tendichvu" v-model="tendichvu" />
          </div>
          <div class="form-group row-content">
            <label for="theloai">thumbnail 2x3</label>

            <div>
              <label for="upload">
                <input type="file" id="upload" @change="handleFileChangeThumbnail" accept="image/*">
              </label>
            </div>
            <div class="files">
              <ul>
                <li v-for="(file, index) in filesArrThumbnail" :key="index">
                  <img class="file-image" :src="getFileUrl(file)" alt="Selected File" style="width: 100px;" />
                  <span class="file-size">{{ getFileSize(file.size) }}</span>
                  <i class='bx bx-message-square-x' @click="removeFileThumbnail(index)"></i>
                </li>
              </ul>
            </div>
            <div v-if="selectedWedding">
              <div class="d-flex hinhanhadminchinhsua">
                <img :src="selectedWedding.banner" alt="Banner Wedding"
                  style="width: 80px; height: 80px; margin: 10px;">
                <div class="remove_img_modal" @click="removeBanner(selectedWedding.id)">
                  <i class='bx bxs-x-square'>xóa</i>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="mota">Mô tả</label>
            <textarea type="text" class="form-control" id="mota" v-model="mota"></textarea>
          </div>
          <div class="form-group">
            <label for="tengoidichvu">Các gói, hạng mục</label>
            <div v-for="(item, index) in goidichvu" :key="index" class="input-group mb-3">
              <input type="text" class="form-control" v-model="item.tengoidichvu">
              <button class="btn btn-secondary" @click="removeGoiDichVu1(index,item.id)">Xóa</button>
            </div>
            <button @click="addGoiDichVu" class="btn btn-secondary">Thêm gói/hạng mục mới</button>
          </div>
          <div v-if="selectedWedding" class="d-flex hinhanhadminchinhsua">
              <div v-for="(imageUrl, index) in selectedWedding.hinhanhchitietdichvu" :key="index">
                <img :src="imageUrl.duongDan" alt="" style="width: 80px; height: 80px; margin: 10px;">
                <div class="remove_img_modal" @click="removeImage(imageUrl.id)">
                  <i class='bx bxs-x-square'></i>
                </div>
              </div>
            </div>
          <div class="form-group row-content">
            <label for="theloai">Hình ảnh danh mục</label>
            <div>
              <label for="upload">
                <input type="file" id="upload" @change="handleFileChangeService" accept="image/*" multiple>
              </label>
            </div>
            <div class="files">
              <ul>
                <li v-for="(file, index) in filesArrService" :key="index">
                  <img class="file-image" :src="file.url" alt="Selected File" style="width: 100px;" />
                  <span class="file-size">{{ getFileSize(file.size) }}</span>
                  <i class='bx bx-message-square-x' @click="removeFileService(index)"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary" @click="updateService()">Thêm</button>
        </div>
      </div>
    </div>
  </div>
  <toast ref="toast"></toast>
</template>
<script>
import toast from '../../components/toast.vue';
export default {
  data() {
    return {
      files: [],
      filesArr: [],
      banners: [],
      filesThumbnail: [],
      filesArrThumbnail: [],
      fileservice: '',
      filesArrService: [],
      tieude: '',
      gioithieu: '',
      banner: '',
      id: '',
      tendichvu: '',
      mota: '',
      goidichvu: [],
      hinhanhchitietdichvu : [],
      service: [],
      selectedWedding : null,
      idservice :'',
    };
  },
  computed: {
    duongdanchitiet() {
      return this.convertToSlug(this.tendichvu);
    },
  },
  components: {
    toast,
  },
  async created() {
    await this.getBannerData();
    await this.getService();
  },
  methods: {
    async getBannerData() {
      try {
        const response = await this.$axios.get('getBannerContentService');
        if (response.data && response.data.length > 0) {
          const data = response.data[0];
          this.id = data.id;
          this.tieude = data.tieude;
          this.gioithieu = data.gioithieu;
          this.banner = data.banner;
          console.log(this.banner)
        } else {
          console.log('Không tìm thấy dữ liệu');
          this.$refs.toast.showToast('Không tìm thấy dữ liệu');
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ server', error);
        this.$refs.toast.showToast('Lỗi khi lấy dữ liệu');
      }
    },
    async getService() {
      try {
        const response = await this.$axios.get('getService');
        this.service = response.data;
        console.log(this.service)
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ server', error);
        this.$refs.toast.showToast('Lỗi khi lấy dữ liệu');
      }
    },
    sendata(a) {
      console.log(a.id)
      this.selectedWedding = a;
      this.idservice = a.id;
      this.tendichvu = a.tendichvu;
      this.mota = a.mota;
      this.banner = service.banner;
      this.goidichvu = a.cacgoidichvu.map(g => ({ ...g }));
      this.hinhanhchitietdichvu = a.hinhanhchitietdichvu.map(g => ({ ...g }));
      console.log(this.goidichvu)
      },
    getFileUrl(file) {
      return URL.createObjectURL(file);
    },
    async removeBanner(bannerId) {
      console.log(bannerId);

      // if (this.banners) {
      //   const index = this.banners.findIndex(banner => banner.id === bannerId);
      //   if (index !== -1) {
      //     this.banners.splice(index, 1);
      //     await this.$axios.delete(`deleteBannerContentService/${bannerId}`)
      //       .then((response) => {
      //         this.$refs.toast.showToast(response.data.message);
      //       })
      //       .catch((error) => {
      //         console.error('Lỗi khi xóa banner:', error);
      //       });
      //   }
      // }
    },
    async removeImage(imageId) {
        console.log(imageId);
        if (this.selectedWedding && this.selectedWedding.hinhanhchitietdichvu) {
          const index = this.selectedWedding.hinhanhchitietdichvu.findIndex(image => image.id === imageId);
          if (index !== -1) {
            this.selectedWedding.hinhanhchitietdichvu.splice(index, 1);
            await this.$axios.delete(`deleteImageService/${imageId}`)
              .then((response) => {
                this.$refs.toast.showToast(response.data.message);
              })
              .catch((error) => {
                console.error('Lỗi khi xóa hình ảnh:', error);
              });
          }
        }
    },
  
    async submitForm() {
      console.log(this.filesArr)
      try {
        if (!this.filesArr) {
          this.$refs.toast.showToast('vui lòng chọn banner');
        } else if (!this.tieude) {
          this.$refs.toast.showToast('chưa nhập tiêu đề');
        } else if (!this.gioithieu) {
          this.$refs.toast.showToast('chưa nhập mô tả dịch vụ');
        } else {
          console.log(this.filesArr)
          const formData = new FormData();
          this.filesArr.forEach((file) => {
            formData.append('avatar', file);
          });
          formData.append('id', this.id);
          formData.append('tieude', this.tieude);
          formData.append('gioithieu', this.gioithieu);
          const response = await this.$axios.post('addBannerContentService', formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Đặt header cho dạng FormData
            },
          });
          this.filesArr = [];
          this.$refs.toast.showToast(response.data.message);
          await this.getBannerData();
        }
      } catch (error) {
        console.error('Lỗi khi tải lên banner', error);
      }
    },
    async addService() {
      console.log(this.duongdanchitiet);
      try {
        if (!this.tendichvu) {
          this.$refs.toast.showToast('chưa nhập tên dịch vụ');
        } else if (!this.mota) {
          this.$refs.toast.showToast('chưa nhập mô tả');
        } else if (this.filesArrThumbnail.length === 0) {
          this.$refs.toast.showToast('chưa chọn hình ảnh thumbnail');
        } else if (this.fileservice.length === 0) {
          this.$refs.toast.showToast('chưa chọn hình ảnh dịch vụ');
        } else {
          const formData = new FormData();
          for (let i = 0; i < this.fileservice.length; i++) {
            const file = this.fileservice[i];
            formData.append('fileService', file);
          }
          for (let i = 0; i < this.filesThumbnail.length; i++) {
            const file = this.filesThumbnail[i];
            formData.append('filesThumbnail', file);
          }
          formData.append('id', this.id);
          formData.append('tendichvu', this.tendichvu);
          formData.append('duongdanchitiet', this.duongdanchitiet);
          formData.append('mota', this.mota);
          for (let i = 0; i < this.goidichvu.length; i++) {
            formData.append('tengoidichvu[]', this.goidichvu[i].tengoidichvu);
          }
          const response = await this.$axios.post('addService', formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Đặt header cho dạng FormData
            },
          });
          this.filesArrThumbnail = [];
          this.filesArrService = [];
          this.$refs.toast.showToast(response.data.message);
          await this.getService();
        }
      } catch (error) {
        console.error('Lỗi khi tải lên banner', error);
      }
    },
    async updateService() {
      try {
        console.log(this.idservice);
        if (!this.tendichvu) {
          this.$refs.toast.showToast('chưa nhập tên dịch vụ');
        } else if (!this.mota) {
          this.$refs.toast.showToast('chưa nhập mô tả');
        } else {
          const formData = new FormData();
          for (let i = 0; i < this.fileservice.length; i++) {
            const file = this.fileservice[i];
            formData.append('fileService', file);
          }
          for (let i = 0; i < this.filesThumbnail.length; i++) {
            const file = this.filesThumbnail[i];
            formData.append('filesThumbnail', file);
          }
          formData.append('id', this.idservice);
          formData.append('tendichvu', this.tendichvu);
          formData.append('duongdanchitiet', this.duongdanchitiet);
          formData.append('mota', this.mota);
          for (let i = 0; i < this.goidichvu.length; i++) {
            formData.append('tengoidichvu[]', this.goidichvu[i].tengoidichvu);
          }
          const response = await this.$axios.put(`UpdateService/${this.idservice}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Đặt header cho dạng FormData
            },
          });
          this.filesArrThumbnail = [];
          this.filesArrService = [];
          this.$refs.toast.showToast(response.data.message);
          await this.getService();
        }
      } catch (error) {
        console.error('Lỗi khi tải lên banner', error);
      }
    },
    addGoiDichVu() {
      this.goidichvu.push({ tengoidichvu: '' });
    },
    removeGoiDichVu(index) {
      this.goidichvu.splice(index, 1);
    },
    async removeGoiDichVu1(index, id) {
      this.goidichvu.splice(index, 1);
      console.log(id);
        if (this.selectedWedding && this.selectedWedding.cacgoidichvu) {
          const index = this.selectedWedding.cacgoidichvu.findIndex(image => image.id === id);
          if (index !== -1) {
            this.selectedWedding.cacgoidichvu.splice(index, 1);
            await this.$axios.delete(`deleteGoiDichVu/${id}`)
              .then((response) => {
                this.$refs.toast.showToast(response.data.message);
              })
              .catch((error) => {
                console.error('Lỗi khi xóa hình ảnh:', error);
              });
          }
        }
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
      const filesArrBanner = Array.from(files);
      for (let i = 0; i < filesArrBanner.length; i++) {
        const file = filesArrBanner[i];
        file.url = URL.createObjectURL(file);
      }
      this.filesArrBanner = filesArrBanner;
    },
    removeFileService(index) {
      URL.revokeObjectURL(this.filesArrBanner[index].url);
      this.filesArrBanner.splice(index, 1);
    },
    handleFileChangeBanner(event) {
      const files = event.target.files;
      const filesArr = Array.from(files);
      this.files = files;
      this.filesArr = filesArr;
    },
    removeFileBanner(index) {
      URL.revokeObjectURL(this.getFileUrl(this.filesArr[index]));
      this.filesArr.splice(index, 1);
    },
    handleFileChangeThumbnail(event) {
      const files = event.target.files;
      const filesArrThumbnail = Array.from(files);
      this.filesThumbnail = files;
      this.filesArrThumbnail = filesArrThumbnail;
    },
    removeFileThumbnail(index) {
      URL.revokeObjectURL(this.filesArrThumbnail[index].url);
      this.filesArrThumbnail.splice(index, 1);
    },
    handleFileChangeService(event) {
      const files = event.target.files;
      this.fileservice = files;
      const filesArr = Array.from(files);
      // Lặp qua danh sách các tệp để tạo URL cho từng tệp
      for (let i = 0; i < filesArr.length; i++) {
        const file = filesArr[i];
        file.url = URL.createObjectURL(file); // Thêm thuộc tính url vào tệp
      }

      this.filesArrService = filesArr;
      console.log(this.filesArrService)
    },
    removeFileService(index) {
      URL.revokeObjectURL(this.filesArrService[index].url);
      this.filesArrService.splice(index, 1);
    },
    setDefault() {
      this.tieude = '';
      this.capdoi = '';
      this.quoctich = '';
      this.ytuong = '';
      this.soluongkhach = '';
      this.diadiem = '';
      this.theloai = '';
      this.duongdan = '';
      this.trangthaihienthi = '';
      this.tieudephu = '';
      this.noidung = '';
      this.bocuc = '';
      this.duongdanmau = '';
    },
  },
};
</script>
<style scoped>
.banner-label {
  padding: 10px 0;
  font-size: 18px;
}

.banner-container {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 10px;
  background-color: #f4f4f4;
}

.banner-item {
  position: relative;
  width: 300px;
  height: 150px;
}

.active {
  border: 2px solid blue;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-remove {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background-color: #ff0000a8;
  padding: 5px;
  border-radius: 50%;
}

.bx {
  color: white;
  font-size: 24px;
}

.form-container {
  margin: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 10px;
}

.form-input,
.banner-select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
}

.upload-label {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.selected-files ul {
  list-style: none;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.selected-image {
  width: 100px;
  height: auto;
  border-radius: 5px;
}

.file-size {
  background-color: #e9ecef;
  padding: 5px 10px;
  border-radius: 5px;
}

.bx-message-square-x {
  cursor: pointer;
  color: #ff0000;
}

.submit-button {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.bxs-x-square {
  color: #ff0000;
}
.bxs-x-square:hover {
  cursor: pointer;
}

@media (max-width: 768px) {
  .banner-item {
    width: 200px;
    height: 100px;
  }

  .form-container,
  .banner-container {
    margin: 10px;
    padding: 10px;
  }

  .upload-label {
    padding: 8px 10px;
  }

  .submit-button {
    padding: 8px 16px;
  }
}

@media (max-width: 480px) {
  .banner-item {
    width: 100%;
    height: auto;
  }

  .form-container {
    margin: 5px;
    padding: 5px;
  }

  .upload-label,
  .submit-button {
    width: 100%;
    text-align: center;
  }

  .selected-image {
    width: 250px;
  }

  .file-item {
    flex-direction: column;
  }
  
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
</style>