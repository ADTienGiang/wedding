<template>
  <footer class="bg-white py-5">
      <div class="container">
          <h4 style="text-align: center;padding-bottom: 50px;">Thêm sửa footer</h4>
          <div class="row text-black g-4">
              
              <div class="col-md-6 col-lg-3">
                
                  <h5 class="fw-light mb-3">Liên hệ với chúng tôi</h5>
                  <div class="d-flex justify-content-start align-items-start my-2 text-muted">
                      <span class="me-3">
                          <i class="fas fa-phone-alt"></i>
                      </span>
                      <span class="fw-light">
                          <input type="text" v-model="formData.sdt" placeholder="nhập số điện thoại">
                      </span>
                  </div>
                  <div class="d-flex justify-content-start align-items-start my-2 text-muted">
                      <span class="me-3">
                          <i class="fas fa-envelope"></i>
                      </span>
                      <span class="fw-light">
                          <input type="text" v-model="formData.email" placeholder="nhập email">
                      </span>
                  </div>
                  <div class="d-flex justify-content-start align-items-start my-2 text-muted">
                      <span class="me-3">
                          <i class="fas fa-map-marked-alt"></i>
                      </span>
                      <span class="fw-light">
                          <input type="text" v-model="formData.diachi" placeholder="nhập địa chỉ">
                      </span>
                  </div>
               
                 
              </div>

              <div class="col-md-6 col-lg-3">
                  <h5 class="fw-light mb-3">Theo dõi chúng tôi tại:</h5>
                  <div>
                      <div class="d-flex justify-content-start align-items-start my-2 text-muted">
                          <span class="me-3">
                              <i class="fab fa-facebook-f"></i>
                          </span>
                          <span class="fw-light">
                              <input type="text" placeholder="nhập link fanpage" v-model="formData.linkSocial1">
                          </span>
                      </div>
                      <div class="d-flex justify-content-start align-items-start my-2 text-muted">
                          <span class="me-3">
                              <i class="fab fa-tiktok"></i>
                          </span>
                          <span class="fw-light">
                              <input type="text" placeholder="nhập link tiktok" v-model="formData.linkSocial2">
                          </span>
                      </div>
                      <div class="d-flex justify-content-start align-items-start my-2 text-muted">
                          <span class="me-3">
                              <i class="fab fa-instagram"></i>
                          </span>
                          <span class="fw-light">
                              <input type="text" placeholder="nhập link instagram" v-model="formData.linkSocial3">
                          </span>
                      </div>
                      <div class="d-flex justify-content-start align-items-start my-2 text-muted">
                          <span class="me-3">
                              <i class="fab fa-pinterest"></i>
                          </span>
                          <span class="fw-light">
                              <input type="text" placeholder="nhập link pinterest" v-model="formData.linkSocial4">
                          </span>
                      </div>
                  </div>
              </div>

              <div class="col-md-6 col-lg-3">
                  <a class="text-uppercase text-decoration-none brand text-black">THÔNG TIN THÊM</a>
                  <p class="text-black text-muted mt-3">
                      <textarea v-model="formData.content1" rows="10" placeholder="Thông tin thêm"></textarea>
                  </p>
              </div>
          </div>
      </div>
  </footer>
  <!-- footer -->
  <footer class="bg-white py-5">
      <div class="container">
          <h4 style="text-align: center;padding-bottom: 50px;">Footer hiện tại</h4>
          <div class="row text-black g-4" v-for="f in footerData">

              <div class="col-md-6 col-lg-3">
                  <a class="text-uppercase text-decoration-none brand text-black" href="index.html">THÔNG TIN</a>
                  <p class="text-black text-muted mt-3">{{ f.content2 }}</p>
              </div>

              <div class="col-md-6 col-lg-3">
                  <h5 class="fw-light mb-3">Liên hệ với chúng tôi</h5>
                  <div class="d-flex justify-content-start align-items-start my-2 text-muted">
                      <span class="me-3">
                          <i class="fas fa-map-marked-alt"></i>
                      </span>
                      <span class="fw-light">
                          {{ f.diachi }}
                      </span>
                  </div>
                  <div class="d-flex justify-content-start align-items-start my-2 text-muted">
                      <span class="me-3">
                          <i class="fas fa-envelope"></i>
                      </span>
                      <span class="fw-light">
                          {{ f.email }}
                      </span>
                  </div>
                  <div class="d-flex justify-content-start align-items-start my-2 text-muted">
                      <span class="me-3">
                          <i class="fas fa-phone-alt"></i>
                      </span>
                      <span class="fw-light">
                          {{ f.sdt }}
                      </span>
                  </div>
              </div>

              <div class="col-md-6 col-lg-3">
                  <h5 class="fw-light mb-3">Theo dõi chúng tôi tại:</h5>
                  <div>
                      <ul class="list-unstyled d-flex">
                          <li>
                              <a :href="f.linkSocial1" class="text-black text-decoration-none text-muted fs-4 me-4">
                                  <i class="fab fa-facebook-f"></i>
                              </a>
                          </li>
                          <li>
                              <a :href="f.linkSocial2" class="text-black text-decoration-none text-muted fs-4 me-4">
                                  <i class="fab fa-twitter"></i>
                              </a>
                          </li>
                          <li>
                              <a :href="f.linkSocial3" class="text-black text-decoration-none text-muted fs-4 me-4">
                                  <i class="fab fa-instagram"></i>
                              </a>
                          </li>
                          <li>
                              <a :href="f.linkSocial4" class="text-black text-decoration-none text-muted fs-4 me-4">
                                  <i class="fab fa-pinterest"></i>
                              </a>
                          </li>
                      </ul>
                  </div>
              </div>

              <div class="col-md-6 col-lg-3">
                  <a class="text-uppercase text-decoration-none brand text-black" href="index.html">THÔNG TIN THÊM</a>
                  <p class="text-black text-muted mt-3">{{ f.content1 }}</p>
              </div>
          </div>
      </div>
  </footer>
  <!-- end of footer -->

  <button @click="saveFooter">Lưu</button>
  <toast ref="toast"></toast>
</template>
<script>
import toast from '../../components/toast.vue';
export default {
  data() {
      return {
          footerData: [],
          formData: {
              content : '',
              content1 : '',
              content2 : '',
              diachi : '',
              email : '',
              sdt : '',
              linkSocial1 : '',
              linkSocial2 : '',
              linkSocial3 : '',
              linkSocial4 : '',
              linkSocial5 : '',
          }
      };
  },
  components: {
      toast,
  },
  async created() {
      // await this.getFooterData();
  },
  methods: {
      async getFooterData() {
          try {
              const response = await this.$axios.get('getFooter');
              this.footerData = response.data;
          } catch (error) {
              console.error('Lỗi khi lấy thông tin footer từ server', error);
          }
      },
      async saveFooter() {
          try {
              const response = await this.$axios.post('addOrUpdateFooter', this.formData);
              this.$refs.toast.showToast(response.data.message);
              this.getFooterData();
          } catch (error) {
              console.error('Lỗi khi lưu thông tin footer', error);
          }
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