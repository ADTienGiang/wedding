<template>
  <div class="banner-management">
    <h2>Quản lý hành trình</h2>
    <a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
      @click="setDefault"><i class="fa-solid fa-circle-plus"></i> <span>Thêm hành trình</span></a>
    <div class="form-container">
      <div class="table-container">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Banner</th>
              <th>Tên cặp đôi</th>
              <th>Tên chủ đề</th>
              <th>Thể loại</th>
              <th>Mô tả</th>
              <th>Hình ảnh</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(wd, index) in album" :key="index">
              <td>
                <div>{{ wd.id }}</div>
              </td>
              <td>
                <div class="max-width-td"><img :src="wd.banner" alt="Hình ảnh part"></div>
              </td>
              <td>
                <div>{{ wd.tencapdoi }}</div>
              </td>
              <td>
                <div>{{ wd.tenchude }}</div>
              </td>
              <td>
                <div>
                  {{ findCategoryNameById(wd.idtheloai) }}
                </div>
              </td>
              <td>
                <div class="max-width-td">{{ wd.mota }}</div>
              </td>
              <td>
                <div class="image-container">
                  <div class="image-list">
                    <div class="image-item">
                      <img v-for="image in wd.hinhanhchitiethanhtrinh" :src="image.duongDan"
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
                  <i class='bx bxs-coffee-togo thungrac' @click="deleteAlbum(wd.id)"></i>
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
              https://domain.com/{{ duongdanhanhtrinh }}
            </div>
            <label for="duongdanhanhtrinh">Đường dẫn (link không được trùng)</label>
            <input type="text" class="form-control" id="duongdanhanhtrinh" v-model="duongdanhanhtrinh" disabled />
          </div>

          <div class="form-group">
            <label for="tenchude">Chủ đề</label>
            <input type="text" class="form-control" id="tenchude" v-model="tenchude" />
          </div>
          <div class="form-group">
            <label for="tencapdoi">Tên cặp đôi</label>
            <input type="text" class="form-control" id="tencapdoi" v-model="tencapdoi" />
          </div>
          <div class="form-group row-content">
            <label for="theloai">banner 3x2</label>
            <div>
              <label for="upload">
                <input type="file" id="upload" @change="handleFileChangeThumbnail" accept="image/*">
              </label>
            </div>
            <div class="files">
              <ul>
                <li v-for="(file, index) in filesArrBanner" :key="index">
                  <img class="file-image" :src="getFileUrl(file)" alt="Selected File" style="width: 100px;" />
                  <span class="file-size">{{ getFileSize(file.size) }}</span>
                  <i class='bx bx-message-square-x' @click="removeFileThumbnail(index)"></i>
                </li>
              </ul>
            </div>
          </div>
          <label for="cat_id">Thể loại</label>
          <br>
          <select id="cat_id" v-model="id_category" required>
            <option disabled>Chọn danh mục</option>
            <option v-for="catsex in category" :key="catsex.id" :value="catsex.id">{{ catsex.tentheloai }}
            </option>
          </select>
          <br>
          <div class="form-group">
            <label for="mota">Mô tả</label>
            <textarea type="text" class="form-control" id="mota" v-model="mota"></textarea>
          </div>
          <div class="form-group">
            <div v-for="(item, index) in nhacungcap" :key="index">
              <label for="nhacungcap">Nhà cung cấp (Photography, Videography,...)</label>
              <input type="text" class="form-control" v-model="item.nhacungcap" />
              <label for="nhacungcap">Tên nhà cung cấp(tên cửa hàng, cá nhân,..)</label>
              <input type="text" class="form-control" v-model="item.tennhacung" />
              <label for="nhacungcap">đường dẫn mạng xã hội (facebook, zalo,...)</label>
              <input type="text" class="form-control" v-model="item.linksocialnhacungcap" />
              <button class="btn btn-secondary" @click="removeGoiDichVu(index)">Xóa</button>
            </div>
            <button @click="addGoiDichVu" class="btn btn-secondary">Thêm nhà cung cấp</button>
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
                <li v-for="(file, index) in filesArrAlbum" :key="index">
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
          <button type="button" class="btn btn-primary" @click="addAlbum()">Thêm</button>
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
              https://domain.com/{{ duongdanhanhtrinh }}
            </div>
            <label for="duongdanhanhtrinh">Đường dẫn (link không được trùng)</label>
            <input type="text" class="form-control" id="duongdanhanhtrinh" v-model="duongdanhanhtrinh" disabled />
          </div>

          <div class="form-group">
            <label for="tenchude">Chủ đề</label>
            <input type="text" class="form-control" id="tenchude" v-model="tenchude" />
          </div>
          <div class="form-group">
            <label for="tencapdoi">Tên cặp đôi</label>
            <input type="text" class="form-control" id="tencapdoi" v-model="tencapdoi" />
          </div>
          <div class="form-group row-content">
            <label for="theloai">banner 3x2</label>
            <div>
              <label for="upload">
                <input type="file" id="upload" @change="handleFileChangeThumbnail" accept="image/*">
              </label>
            </div>
            <div class="files">
              <ul>
                <li v-for="(file, index) in filesArrBanner" :key="index">
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
          <label for="cat_id">Thể loại</label>
          <br>
          <select id="cat_id" v-model="id_category" required>
            <option disabled>Chọn danh mục</option>
            <option v-for="catsex in category" :key="catsex.id" :value="catsex.id">{{ catsex.tentheloai }}
            </option>
          </select>
          <br>
          <div class="form-group">
            <label for="mota">Mô tả</label>
            <textarea type="text" class="form-control" id="mota" v-model="mota"></textarea>
          </div>
          <div class="form-group">
            <div v-for="(item, index) in nhacungcap" :key="index">
              <label for="nhacungcap">Nhà cung cấp (Photography, Videography,...)</label>
              <input type="text" class="form-control" v-model="item.nhacungcap" />
              <label for="nhacungcap">Tên nhà cung cấp(tên cửa hàng, cá nhân,..)</label>
              <input type="text" class="form-control" v-model="item.tennhacung" />
              <label for="nhacungcap">đường dẫn mạng xã hội (facebook, zalo,...)</label>
              <input type="text" class="form-control" v-model="item.linksocialnhacungcap" />
              <button class="btn btn-secondary" @click="removeGoiDichVu1(index, item.id)">Xóa</button>
            </div>
            <button @click="addGoiDichVu" class="btn btn-secondary">Thêm nhà cung cấp</button>
          </div>
          <div v-if="selectedWedding" class="d-flex hinhanhadminchinhsua">
            <div v-for="(imageUrl, index) in selectedWedding.hinhanhchitiethanhtrinh" :key="index">
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
                <li v-for="(file, index) in filesArrAlbum" :key="index">
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
          <button type="button" class="btn btn-primary" @click="updateAlbum()">Thêm</button>
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
      filesBanner: [],
      filesArrBanner: [],
      filealbum: '',
      filesArrAlbum: [],
      tencapdoi: '',
      tenchude: '',
      id_category: '',
      category: [],
      tentheloai: '',
      mota: '',
      banner: '',
      id: '',
      nhacungcap: [],
      hinhanhchitietdichvu: [],
      album: [],
      selectedWedding: null,
      idservice: '',
    };
  },
  computed: {
    duongdanhanhtrinh() {
      return this.convertToSlug(this.tenchude);
    },
  },
  components: {
    toast,
  },
  async created() {
    await this.getAlbum();
  },
  async mounted() {
    await this.getcategory();
  },
  methods: {
    async getAlbum() {
      try {
        const response = await this.$axios.get('getAlbum');
        this.album = response.data;
        console.log(this.album)
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
    getFileUrl(file) {
      return URL.createObjectURL(file);
    },
    async removeBanner(bannerId) {

      if (this.selectedWedding && this.selectedWedding.banner) {
        this.selectedWedding.banner = '';
        await this.$axios.delete(`deleteBannerAlbum/${bannerId}`)
          .then((response) => {
            this.$refs.toast.showToast(response.data.message);
          })
          .catch((error) => {
            console.error('Lỗi khi xóa banner:', error);
          });
      }
    },
    async removeImage(imageId) {
      console.log(imageId);
      if (this.selectedWedding && this.selectedWedding.hinhanhchitiethanhtrinh) {
        const index = this.selectedWedding.hinhanhchitiethanhtrinh.findIndex(image => image.id === imageId);
        if (index !== -1) {
          this.selectedWedding.hinhanhchitiethanhtrinh.splice(index, 1);
          await this.$axios.delete(`deleteImageAlbum/${imageId}`)
            .then((response) => {
              this.$refs.toast.showToast(response.data.message);
            })
            .catch((error) => {
              console.error('Lỗi khi xóa hình ảnh:', error);
            });
        }
      }
    },
    sendata(a) {
      console.log(a.id)
      this.selectedWedding = a;
      this.id = a.id;
      this.tenchude = a.tenchude;
      this.tencapdoi = a.tencapdoi;
      this.mota = a.mota;
      this.id_category = a.idtheloai;
      this.tentheloai = a.tentheloai;
      this.banner = a.banner;
      this.nhacungcap = a.nhacungcap.map(g => ({ ...g }));
      this.hinhanhchitiethanhtrinh = a.hinhanhchitiethanhtrinh.map(g => ({ ...g }));
    },
    async addAlbum() {
      console.log(this.nhacungcap);
      try {
        if (!this.tencapdoi) {
          this.$refs.toast.showToast('chưa nhập tên cặp đôi');
        } else if (!this.mota) {
          this.$refs.toast.showToast('chưa nhập mô tả');
        } else if (!this.tenchude) {
          this.$refs.toast.showToast('chưa nhập chủ đề');
        } else if (this.filesBanner.length === 0) {
          this.$refs.toast.showToast('chưa chọn hình ảnh thumbnail');
        } else if (this.filealbum.length === 0) {
          this.$refs.toast.showToast('chưa chọn hình ảnh album');
        } else {
          const formData = new FormData();
          for (let i = 0; i < this.filealbum.length; i++) {
            const file = this.filealbum[i];
            formData.append('fileAlbum', file);
          }
          for (let i = 0; i < this.filesBanner.length; i++) {
            const file = this.filesBanner[i];
            formData.append('filesBanner', file);
          }
          formData.append('id', this.id);
          formData.append('id_category', this.id_category);
          formData.append('tencapdoi', this.tencapdoi);
          formData.append('tenchude', this.tenchude);
          formData.append('mota', this.mota);
          formData.append('duongdanhanhtrinh', this.duongdanhanhtrinh);
          for (let i = 0; i < this.nhacungcap.length; i++) {
            formData.append('nhacungcap1[]', JSON.stringify(this.nhacungcap[i]));
          }
          const response = await this.$axios.post('addAlbum', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          this.filesArrBanner = [];
          this.filesArrAlbum = [];
          this.$refs.toast.showToast(response.data.message);
          await this.getAlbum();
        }
      } catch (error) {
        console.error('Lỗi khi tải lên banner', error);
      }
    },
    async updateAlbum() {
      console.log('ma album la : ' + this.id)
      try {
        if (!this.tencapdoi) {
          this.$refs.toast.showToast('chưa nhập tên cặp đôi');
        } else if (!this.mota) {
          this.$refs.toast.showToast('chưa nhập mô tả');
        } else if (!this.tenchude) {
          this.$refs.toast.showToast('chưa nhập chủ đề');
        } else {
          const formData = new FormData();
          for (let i = 0; i < this.filealbum.length; i++) {
            const file = this.filealbum[i];
            formData.append('fileAlbum', file);
          }
          for (let i = 0; i < this.filesBanner.length; i++) {
            const file = this.filesBanner[i];
            formData.append('filesBanner', file);
          }
          formData.append('id', this.id);
          formData.append('id_category', this.id_category);
          formData.append('tencapdoi', this.tencapdoi);
          formData.append('tenchude', this.tenchude);
          formData.append('mota', this.mota);
          formData.append('duongdanhanhtrinh', this.duongdanhanhtrinh);
          for (let i = 0; i < this.nhacungcap.length; i++) {
            formData.append('nhacungcap1[]', JSON.stringify(this.nhacungcap[i]));
          }
          const response = await this.$axios.put(`UpdateAlbum/${this.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          this.filesArrBanner = [];
          this.filesArrAlbum = [];
          this.$refs.toast.showToast(response.data.message);
          await this.getAlbum();
        }
      } catch (error) {
        console.error('Lỗi khi tải lên banner', error);
      }
    },
    async deleteAlbum(id) {
      const userConfirmed = confirm("bạn có chắc chắn muốn xóa album này?");
      if (userConfirmed) {
        try {
          const productdelete = await this.$axios.delete(
            `deleteAlbum/` + id
          );
          this.$refs.toast.showToast(productdelete.data.message);
          this.getAlbum();
        } catch (error) {
          console.error(error);
        }
      } else {
        // Người dùng đã hủy xóa sản phẩm
      }
    },
    addGoiDichVu() {
      this.nhacungcap.push({ nhacungcap: '', tennhacung: '', linksocialnhacungcap: '' });
    },
    removeGoiDichVu(index) {
      this.nhacungcap.splice(index, 1);
    },
    findCategoryNameById(idtheloai) {
      const category = this.category.find(cat => cat.id === idtheloai);
      return category ? category.tentheloai : 'Không rõ';
    },
    async removeGoiDichVu1(index, id) {
      this.nhacungcap.splice(index, 1);
      console.log(id);
      if (this.selectedWedding && this.selectedWedding.nhacungcap) {
        const index = this.selectedWedding.nhacungcap.findIndex(image => image.id === id);
        if (index !== -1) {
          this.selectedWedding.nhacungcap.splice(index, 1);
          await this.$axios.delete(`deleteNhaCungCap/${id}`)
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
      URL.revokeObjectURL(this.filesArrBanner[index].url);
      this.filesArrBanner.splice(index, 1);
    },
    handleFileChangeThumbnail(event) {
      const files = event.target.files;
      const filesArrBanner = Array.from(files);
      this.filesBanner = files;
      this.filesArrBanner = filesArrBanner;
    },
    removeFileThumbnail(index) {
      URL.revokeObjectURL(this.filesArrBanner[index].url);
      this.filesArrBanner.splice(index, 1);
    },
    handleFileChangeService(event) {
      const files = event.target.files;
      this.filealbum = files;
      const filesArr = Array.from(files);
      // Lặp qua danh sách các tệp để tạo URL cho từng tệp
      for (let i = 0; i < filesArr.length; i++) {
        const file = filesArr[i];
        file.url = URL.createObjectURL(file); // Thêm thuộc tính url vào tệp
      }

      this.filesArrAlbum = filesArr;
      console.log(this.filesArrAlbum)
    },
    removeFileService(index) {
      URL.revokeObjectURL(this.filesArrAlbum[index].url);
      this.filesArrAlbum.splice(index, 1);
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

.hinhanhadminchinhsua {
  margin-bottom: 10px;
  width: 100%;
  overflow-x: auto;
}

.hinhanhadminchinhsua img {
  object-fit: cover;
  padding-right: 2px;
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