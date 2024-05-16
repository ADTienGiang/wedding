<template>
  <div class="form-container">
    <h2>Chỉnh sửa Mô tả dịch vụ</h2>
    <form @submit.prevent="addMoTaDichVu">
      <!-- Input cho tiêu đề -->

      <!-- Textarea cho mô tả dịch vụ -->
      <div class="input-group">
        <p for="intro">Mô tả các dịch vụ của bạn:</p>
        <textarea  class="form-input" id="intro" v-model="motadichvu" rows="4" cols="50" placeholder="Nhập mô tả dịch vụ ở đây">
        </textarea>
      </div>

      <button type="submit" class="submit-button">Lưu Thay Đổi</button>
    </form>
  </div>
  <toast ref="toast"></toast>
</template>
<script>
import toast from '../../components/toast.vue';
export default {
  data() {
    return {
      loiMoDau: [],  
      id: null,  
      tieude: '',
      motadichvu: '',
    };
  },
  components: {
    toast,
  },
  async created() {
    await this.getMoTaDichVu();
  },
  methods: {
    async addMoTaDichVu() {
    try {
      const response = await this.$axios.post('addMoTaDichVu', {
        id: this.id,  // Gửi ID nếu có
        motadichvu: this.motadichvu,
      });
      if (!this.id) {
        // Nếu chưa có ID, lưu ID được trả về từ server
        this.id = response.data.id;
      }
      this.$refs.toast.showToast(response.data.message);
      this.getMoTaDichVu();  // Cập nhật form với thông tin mới nhất
    } catch (error) {
      console.error('Lỗi khi thêm hoặc cập nhật mô tả dịch vụ:', error);
      this.$refs.toast.showToast('Lỗi khi lưu mô tả dịch vụ');
    }
  },
  async getMoTaDichVu() {
    try {
      const result = await this.$axios.get('getMoTaDichVu');
      if (result.data && result.data.length > 0) {
        const data = result.data[0];
        this.id = data.id;
        this.motadichvu = data.motadichvu;
      } else {
        console.log('Không tìm thấy mô tả dịch vụ');
        this.$refs.toast.showToast('Không tìm thấy mô tả dịch vụ');
      }
    } catch (e) {
      console.error('Lỗi khi lấy mô tả dịch vụ:', e);
      this.$refs.toast.showToast('Lỗi khi tải mô tả dịch vụ');
    }
  }

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
  margin-top: 10px;
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