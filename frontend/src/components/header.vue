<template>
    <div class="menu">
      <div class="menu">
        <div class="wrap-content d-flex flex-wrap align-items-center justify-content-between">
            <ul class="d-flex flex-wrap align-items-center justify-content-between ulmn">
                <li><router-link class="transition" :to="'/gioi-thieu'" title="Giới thiệu">Giới thiệu</router-link></li>
                <li><router-link class="transition" :to="'/dich-vu'" title="Dịch vụ">Dịch vụ</router-link></li>
                <li><router-link class="transition" :to="'/hanh-trinh'" title="Hành trình">Hành trình</router-link></li>
            </ul>
            <router-link class="logo-header" :to="'/'">
                <img v-for="a in logo"
                     :src="a.duongDan"/>
            </router-link>
            <ul class="d-flex flex-wrap align-items-center justify-content-between ulmn">
                <li><router-link class="transition" :to="'/video'" title="Video">Video</router-link></li>
                <li><router-link class="transition" :to="'/danh-gia'" title="Đánh giá">Đánh giá</router-link></li>
                <li><router-link class="transition" :to="'/lien-he'" title="Liên hệ">Liên hệ</router-link></li>
            </ul>
        </div>
    </div>
    </div>
    <div class="menu-res11">
    <div class="menu-bar-res1">
      <router-link class="logo-header" :to="'/'">
                <img v-for="a in logo"
                     :src="a.duongDan"/>
            </router-link>
      <div @click="toggleMenu" class="menu-icon">
        <i :class="{'bx bx-menu': !isMenuOpen, 'bx bx-x': isMenuOpen}"></i>
      </div>
    </div>
    <div class="menu-overlay" v-if="isMenuOpen" @click="closeMenu"></div>
    <div class="menu-content" :class="{ 'active': isMenuOpen }">
      <!-- Nội dung menu đặt ở đây -->
      <ul class="menu-list">
        <li><router-link to="/gioi-thieu">GIỚI THIỆU</router-link></li>
        <li><router-link to="/hanh-trinh">HÀNH TRÌNH</router-link></li>
        <li><router-link to="/danh-gia">BLOG</router-link></li>
        <li><router-link to="/lien-he">LIÊN HỆ</router-link></li>
        <li><router-link to="/dich-vu">DỊCH VỤ</router-link></li>
        <li><router-link to="/video">VIDEO</router-link></li>
        <li><router-link to="/wedding-decoration">STYLING & DECORATION</router-link></li>
        <li><router-link to="/wedding-planner">WEDDING PLANNING</router-link></li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      logo: [],
    };
  },
  async created() {
    await this.getLogo();
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    async getLogo() {
      try {
        const response = await this.$axios.get('getLogo');
        this.logo = response.data;
      } catch (error) {
        console.error('Lỗi khi lấy danh sách banner từ server', error);
      }
    },
  }
};
</script>
<style scoped>
.menu-bar-res1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-res11 {
  background-color: #FDF6F0;
  height: 100%;
}

.menu-icon {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  margin-right: 10px;
}

.menu-content {
  position: fixed;
  width: 70%;
  height: 100%;
  top: 0;
  left: 0; /* Menu bắt đầu từ cạnh trái của màn hình */
  background-color: white;
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-100%); /* Di chuyển menu hoàn toàn ra ngoài màn hình bên trái */
}

.menu-content.active {
  transform: translateX(0); /* Di chuyển menu hoàn toàn vào màn hình */
}



.menu-list {
  list-style: none;
  margin: 20px;
  padding: 0;
}

.menu-list li {
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: bold;
}

.menu-list li a {
  text-decoration: none;
  color: black;
  transition: color 0.3s;
}

.menu-list li a:hover {
  color: #d4a017; /* Thay đổi màu khi di chuột qua */
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Màu nền semi-transparent */
  z-index: 999; /* Đảm bảo nó nằm dưới menu và trên nội dung khác */
}
@media (max-width: 768px) { /* Giả sử màn hình dưới 768px là mobile */
  .menu-res11 {
    display: block; /* hoặc 'flex' tùy vào layout của bạn */
    /* Các styles cần thiết cho menu ở đây */
  }
}

/* Phần menu sẽ bị ẩn trên màn hình lớn hơn 768px */
@media (min-width: 769px) {
  .menu-res11 {
    display: none;
  }
}
@media (max-width: 1024px) { /* Giả sử màn hình dưới 768px là mobile */
  .menu-res11 {
    display: block; /* hoặc 'flex' tùy vào layout của bạn */
    /* Các styles cần thiết cho menu ở đây */
  }
}

/* Phần menu sẽ bị ẩn trên màn hình lớn hơn 768px */
@media (min-width: 1025px) {
  .menu-res11 {
    display: none;
  }
}
@media (max-width: 480px) {
    a.logo-header img {
        max-height: 76px;
    }
}
</style>