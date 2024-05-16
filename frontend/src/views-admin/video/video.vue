<template>
    <div class="banner-management">
      <h2>Quản lý video</h2>
      <a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
        @click="setDefault"><i class="fa-solid fa-circle-plus"></i> <span>Thêm video</span></a>
      <div class="form-container">
        <div class="table-container">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>Banner</th>
                <th>Tên cặp đôi</th>
                <th>Tên chủ đề</th>
                <th>link youtube</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(wd, index) in video" :key="index">
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
                  <div>{{ wd.tieude }}</div>
                </td>
                <td>
                    <div>{{ wd.linkyt }}</div>
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
            <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm video mới</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="tieude">Chủ đề video</label>
              <input type="text" class="form-control" id="tieude" v-model="tieude" />
            </div>
            <div class="form-group">
              <label for="tencapdoi">Tên cặp đôi</label>
              <input type="text" class="form-control" id="tencapdoi" v-model="tencapdoi" />
            </div>
            <div class="form-group">
              <label for="linkyt">Mã nhúng (chuột phải vào video youtube -> sao chép mã nhúng)</label>
              <textarea type="text" class="form-control" id="linkyt" v-model="linkyt" placeholder="<ifame></ifame>"></textarea>
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
            <h1 class="modal-title fs-5" id="exampleModalLabel">chỉnh sửa video</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="tieude">Chủ đề video</label>
              <input type="text" class="form-control" id="tieude" v-model="tieude" />
            </div>
            <div class="form-group">
              <label for="tencapdoi">Tên cặp đôi</label>
              <input type="text" class="form-control" id="tencapdoi" v-model="tencapdoi" />
            </div>
            <div class="form-group">
              <label for="linkyt">Mã nhúng (chuột phải vào video youtube -> sao chép mã nhúng)</label>
              <textarea type="text" class="form-control" id="linkyt" v-model="linkyt" ></textarea>
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
              <div v-if="selectedWedding" class="d-flex hinhanhadminchinhsua">
              <img :src="selectedWedding.banner" alt="" style="width: 80px; height: 80px; margin: 10px;">
              <div class="remove_img_modal" @click="removeBanner(selectedWedding.id)">
                <i class='bx bxs-x-square'></i>
              </div>
          </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            <button type="button" class="btn btn-primary" @click="updateAlbum()">Cập nhật</button>
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
        tieude: '',
        banner: '',
        id: '',
        video: [],
        linkyt : '',
        selectedWedding : null,
      };
    },
    components: {
      toast,
    },
    async created() {
      await this.getVideo();
    },
  
    methods: {
      async getVideo() {
        try {
          const response = await this.$axios.get('getVideo');
          this.video = response.data;
          console.log(this.video)
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu từ server', error);
          this.$refs.toast.showToast('Lỗi khi lấy dữ liệu');
        }
      },
      getFileUrl(file) {
        return URL.createObjectURL(file);
      },
      async removeBanner(bannerId) {
  
        if (this.selectedWedding && this.selectedWedding.banner) {
          this.selectedWedding.banner = '';
          await this.$axios.delete(`deleteBannerVideo/${bannerId}`)
            .then((response) => {
              this.$refs.toast.showToast(response.data.message);
            })
            .catch((error) => {
              console.error('Lỗi khi xóa banner:', error);
            });
        }
      },
      sendata(a) {
        console.log(a.id)
        this.selectedWedding = a;
        this.id = a.id;
        this.tieude = a.tieude;
        this.tencapdoi = a.tencapdoi;
        this.banner = a.duongDan;
        this.linkyt = a.linkyt;
      },
      async addAlbum() {
        try {
          if (!this.tencapdoi) {
            this.$refs.toast.showToast('chưa nhập tên cặp đôi');
          }  else if (!this.tieude) {
            this.$refs.toast.showToast('chưa nhập chủ đề');
          } else if (this.filesBanner.length === 0) {
            this.$refs.toast.showToast('chưa chọn hình ảnh thumbnail');
          }  else {
            var iframeCode = this.linkyt;
            var srcMatch = iframeCode.match(/src="([^"]+)"/);
            if (srcMatch && srcMatch.length > 1) {
                var srcAttribute = srcMatch[1];
                this.linkyt = srcAttribute;
                console.log(this.linkyt);
            } else {
                console.error('Không tìm thấy đường dẫn src trong mã nhúng của iframe');
            }
            const formData = new FormData();
            for (let i = 0; i < this.filesBanner.length; i++) {
              const file = this.filesBanner[i];
              formData.append('filesBanner', file);
            }
            formData.append('id', this.id);
            formData.append('tencapdoi', this.tencapdoi);
            formData.append('tieude', this.tieude);
            formData.append('linkyt', this.linkyt);
            const response = await this.$axios.post('addVideo', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            this.filesArrBanner = [];
            this.$refs.toast.showToast(response.data.message);
            await this.getVideo();
          }
        } catch (error) {
          console.error('Lỗi khi tải lên banner', error);
        }
      },
      async updateAlbum() {
        try {
          if (!this.tencapdoi) {
            this.$refs.toast.showToast('chưa nhập tên cặp đôi');
          }  else if (!this.tieude) {
            this.$refs.toast.showToast('chưa nhập chủ đề');
          } else {

            var iframeCode = this.linkyt;
            var srcMatch = iframeCode.match(/src="([^"]+)"/);
            if (srcMatch && srcMatch.length > 1) {
                var srcAttribute = srcMatch[1];
                this.linkyt = srcAttribute;
                console.log(this.linkyt);
            } else {
                console.error('Không tìm thấy đường dẫn src trong mã nhúng của iframe');
            }
            const formData = new FormData();
            for (let i = 0; i < this.filesBanner.length; i++) {
              const file = this.filesBanner[i];
              formData.append('filesBanner', file);
            }
            formData.append('id', this.id);
            formData.append('tencapdoi', this.tencapdoi);
            formData.append('tieude', this.tieude);
            formData.append('linkyt', this.linkyt);
            const response = await this.$axios.put(`UpdateVideo/${this.id}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            this.filesArrBanner = [];
            this.$refs.toast.showToast(response.data.message);
            await this.getVideo();
          }
        } catch (error) {
          console.error('Lỗi khi tải lên banner', error);
        }
      },
      async deleteAlbum(id) {
        const userConfirmed = confirm("bạn có chắc chắn muốn xóa video này?");
        if (userConfirmed) {
          try {
            const productdelete = await this.$axios.delete(
              `deleteVideo/` + id
            );
            this.$refs.toast.showToast(productdelete.data.message);
            this.getVideo();
          } catch (error) {
            console.error(error);
          }
        } else {
          // Người dùng đã hủy xóa sản phẩm
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
        this.linkyt = '';
        this.tencapdoi = '';
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