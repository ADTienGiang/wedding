<template>
  <p class="banner-label">Banner hiện tại</p>
  <div class="banner-container">
    <div :class="{'banner-item active': index === 0, 'banner-item': index !== 0}" v-for="(banner, index) in banners" :key="index">
      <div class="banner-remove" @click="removeBanner(banner.id)">
        <i class='bx bxs-x-square'></i>
      </div>
      <img class="banner-image" :src="banner.duongDan" :alt="banner.tenHinh" />
    </div>
  </div>  

  <div class="form-container">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <p>Chọn kích thước banner:</p>
        <select class="banner-select" v-model="selectedSize">
          <option value="1900x1000">16x9 (dành cho PC)</option>
          <option value="800x1000">2x3 (dành cho điện thoại)</option>
        </select>
      </div>
      <div class="form-group">
        <label for="upload" class="upload-label">
          <input type="file" id="upload" multiple @change="handleFileChange" accept="image/*">
          Chọn hình ảnh 
        </label>
      </div>
    
      <div class="selected-files">
        <h2>Hình đã chọn</h2>
        <ul>
          <li class="file-item" v-for="(file, index) in filesArr" :key="index">
            <img class="selected-image" :src="getFileUrl(file)" alt="Selected File" />
            <span class="file-size">{{ getFileSize(file.size) }}</span>
            <i class='bx bx-message-square-x' @click="removeFile(index)"></i>
          </li>
        </ul>
      </div>

      <input type="submit" value="Gửi" class="submit-button" />
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
      selectedSize: '1',
    };
  },
  components: {
    toast,
  },
  async created() {
    // Gọi hàm để lấy danh sách banner từ server
    await this.getBannerData();
  },
  methods: {
    async getBannerData() {
      try {
        // Gọi API để lấy danh sách banner từ server
        const response = await this.$axios.get('getBannerHome');
        this.banners = response.data;
      } catch (error) {
        console.error('Lỗi khi lấy danh sách banner từ server', error);
      }
    },


    getFileUrl(file) {
      return URL.createObjectURL(file);
    },
    handleFileChange(event) {
      const files = event.target.files;
      const filesArr = Array.from(files);
      this.files = files;
      this.filesArr = filesArr;
    },
    removeFile(index) {
      URL.revokeObjectURL(this.getFileUrl(this.filesArr[index])); // Giải phóng URL
      this.filesArr.splice(index, 1);
    },
    async removeBanner(bannerId) {
      console.log(bannerId);

      if (this.banners) {
        const index = this.banners.findIndex(banner => banner.id === bannerId);

        if (index !== -1) {
          // Sử dụng splice để xóa banner khỏi mảng
          this.banners.splice(index, 1);

          // Gửi yêu cầu HTTP để xóa banner khỏi cơ sở dữ liệu
          await this.$axios.delete(`deleteBannerHome/${bannerId}`)
            .then((response) => {
              this.$refs.toast.showToast(response.data.message);
            })
            .catch((error) => {
              console.error('Lỗi khi xóa banner:', error);
            });
        }
      }
    },

    async submitForm() {
      try {
        if (this.filesArr.length === 0) {
          this.$refs.toast.showToast('vui lòng chọn banner');
        } else if(!this.selectedSize){
          this.$refs.toast.showToast('chưa chọn kích thước');
        } else {
          console.log(this.filesArr)
          // Tạo một đối tượng FormData để chứa các tệp hình ảnh đã chọn
          const formData = new FormData();
          // Thêm từng tệp vào formData
          this.filesArr.forEach((file) => {
            formData.append('avatar', file);
          });
          formData.append('kichthuoc', this.selectedSize);
          // Sử dụng Axios để thực hiện POST request lên máy chủ
          const response = await this.$axios.post('addBannerHome', formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Đặt header cho dạng FormData
            },
          });

          // Xóa danh sách các tệp đã chọn sau khi tải lên thành công 
          this.filesArr = [];

          // In thông báo hoặc thực hiện các tác vụ khác sau khi tải lên thành công
          this.$refs.toast.showToast(response.data.message);

          // Sau khi thêm banner thành công, gọi lại hàm để cập nhật danh sách banner
          await this.getBannerData();
        }


      } catch (error) {
        console.error('Lỗi khi tải lên banner', error);
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
};
</script>




<style scoped>
/* Reset styles */
/* Reset styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
}

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
  border: 2px solid blue; /* Highlight active banner */
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
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 10px;
}

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
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

/* Media queries */
@media (max-width: 768px) {
  .banner-item {
    width: 200px;
    height: 100px;
  }

  .form-container, .banner-container {
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

  .upload-label, .submit-button {
    width: 100%; /* Make buttons full-width */
    text-align: center;
  }

  .selected-image {
    width: 250px; /* Smaller images for smaller screens */
  }

  .file-item {
    flex-direction: column; /* Stack elements vertically */
  }
}

</style>