<template>
    <h3>Banner contact hiện tại</h3>
    <div class="form-container">
      <div class="banner-container">
        <div :class="{ 'banner-item active': index === 0, 'banner-item': index !== 0 }">
          <div class="banner-remove" @click="removeBanner(this.id)">
            <i class='bx bxs-x-square'></i>
          </div>
          <img class="banner-image" :src="this.banner1" />
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
        
          <label for="service">tiêu đề liên hệ:</label>
          <textarea rows="4" cols="50" type="text" id="service" v-model="gioithieu" class="form-input"
            placeholder="Nhập tên tiêu đề liên hệ"></textarea>
            <label for="service">Giới thiệu liên hệ:</label>
          <input type="text" id="service" v-model="gioithieulienhe" class="form-input"
            placeholder="Nhập tên Giới thiệu về liên hệ">

            <label for="service">Số điện thoại:</label>
          <input type="text" id="service" v-model="sdt" class="form-input"
            placeholder="Nhập số điện thoại">

            <label for="service">Email:</label>
          <input type="text" id="service" v-model="email" class="form-input"
            placeholder="Nhập email">

            <label for="service">Địa chỉ:</label>
          <input type="text" id="service" v-model="diachi" class="form-input"
            placeholder="Nhập địa chỉ   ">
        </div>
        <input type="submit" value="Lưu" class="submit-button" />
      </form>
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
        gioithieulienhe : '',
        sdt : '',
        email : '',
        diachi : '',
        banner: '',
        banner1: '',
        id: '',
        tieude: '',
        mota: '',
        goidichvu: [],
        hinhanhblog : [],
        service: [],
        selectedWedding : null,
        idblog :'',
      };
    },
    computed: {
      duongdanchitiet() {
        return this.convertToSlug(this.tieude);
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
          const response = await this.$axios.get('getBannerContentContact');
          if (response.data && response.data.length > 0) {
            console.log(response.data)
            const data = response.data[0];
            this.id = data.id;
            this.gioithieu = data.gioithieu;
            this.banner1 = data.banner;
            this.gioithieulienhe = data.gioithieulienhe;
            this.sdt = data.sdt;
            this.email = data.email;
            this.diachi = data.diachi;
          } else {
            console.log('Không tìm thấy dữ liệu');
            // this.$refs.toast.showToast('Không tìm thấy dữ liệu');
          }
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu từ server', error);
          // this.$refs.toast.showToast('Lỗi khi lấy dữ liệu');
        }
      },
      async getService() {
        try {
          const response = await this.$axios.get('getBlog');
          this.service = response.data;
          console.log(this.service)
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu từ server', error);
        }
      },
      sendata(a) {
        console.log(a.id)
        this.selectedWedding = a;
        this.idblog = a.id;
        this.tieude = a.tieude;
        this.mota = a.mota;
        this.banner = a.thumb;
        this.hinhanhblog = a.hinhanhblog.map(g => ({ ...g }));
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
          if (this.selectedWedding && this.selectedWedding.hinhanhblog) {
            const index = this.selectedWedding.hinhanhblog.findIndex(image => image.id === imageId);
            if (index !== -1) {
              this.selectedWedding.hinhanhblog.splice(index, 1);
              await this.$axios.delete(`deleteImageBlog/${imageId}`)
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
        try {
          if (!this.filesArr) {
            this.$refs.toast.showToast('vui lòng chọn banner');
          } else if (!this.gioithieu) {
            this.$refs.toast.showToast('chưa nhập giới thiệu liên hệ');
          } else {
            console.log(this.filesArr)
            const formData = new FormData();
            this.filesArr.forEach((file) => {
              formData.append('avatar', file);
            });
            // gioithieulienhe : '',
            // sdt : '',
            // email : '',
            // diachi : '',
            formData.append('id', this.id);
            formData.append('gioithieu', this.gioithieu);
            formData.append('gioithieulienhe', this.gioithieulienhe);
            formData.append('sdt', this.sdt);
            formData.append('email', this.email);
            formData.append('diachi', this.diachi);
            const response = await this.$axios.post('addBannerContentContact', formData, {
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
      async addBlog() {
        console.log(this.duongdanchitiet);
        try {
          if (!this.tieude) {
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
            formData.append('tieude', this.tieude);
            formData.append('duongdanchitiet', this.duongdanchitiet);
            formData.append('mota', this.mota);
            const response = await this.$axios.post('addBlog', formData, {
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
          console.log(this.idblog);
          if (!this.tieude) {
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
            formData.append('id', this.idblog);
            formData.append('tieude', this.tieude);
            formData.append('duongdanchitiet', this.duongdanchitiet);
            formData.append('mota', this.mota);
            const response = await this.$axios.put(`UpdateBlog/${this.idblog}`, formData, {
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