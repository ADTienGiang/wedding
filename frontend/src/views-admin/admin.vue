<template>
    <nav class="main-header navbar navbar-expand-lg navbar-light bg-light">
        <ul class="navbar-toggle" @click="toggleMobileSidebar">
            <li class="nav-item">
                <a class="nav-link " data-widget="pushmenu"><i class="fas fa-bars iconpc" id="sidebarToggle"></i></a>
            </li>
        </ul>
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" @click="logout($event)"><i class="fas fa-sign-out-alt mr-1"></i>Đăng xuất</a>
            </li>
        </ul>
    </nav>
    <div class="admin-container">
        <div class="sidebar" :class="['sidebar', sidebarCollapsed ? 'sidebar-collapsed' : '']">
            <ul class="navbar-toggle  dauxdongmenuadmin" @click="toggleMobileSidebar">
                <li class="nav-item">
                    <a data-widget="pushmenu">
                        <i class="fas icondauxtatmenu" :class="menuOpen ? 'fa-times' : 'fa-bars'"
                            id="sidebarToggle"></i>
                    </a>
                </li>
            </ul>
            <div class="sidebar-content">

                <ul class="lists">
                    <li class="list">
                        <a class="nav-link">
                            <router-link to="/admin/" class="nav-link" @click="highlightMenu('admin')"
                                :class="{ active: activeMenu === 'admin' }">
                                <span class="icon"><i class='bx bxs-tachometer'></i></span>
                                <span class="link">Điều khiển</span>
                            </router-link>
                        </a>
                    </li>
                    <!-- Menu cha 1 -->
                    <!-- Menu cha 2 -->
                    <li class="list">
                        <a class="nav-link" @click="menu13Expanded = !menu13Expanded">
                            <span class="icon"><i class="bx bx-category icon"></i></span>
                            <span class="link">Trang chủ</span>
                            <i class="bx" :class="menu13Expanded ? 'bx-chevron-up' : 'bx-chevron-down'"></i>
                        </a>
                        <ul v-show="menu13Expanded" class="sub-menu">
                            <li class="list">
                                <router-link to="/admin/banner" class="nav-link" @click="highlightMenu('category')"
                                    :class="{ active: activeMenu === 'category' }">
                                    <span class="icon"><i class='bx bx-tag-alt'></i></span>
                                    <span class="link">Banner</span>

                                </router-link>
                            </li>
                            <li class="list">
                                <router-link to="/admin/loiMoDau" class="nav-link" @click="highlightMenu('loiMoDau')"
                                    :class="{ active: activeMenu === 'loiMoDau' }">
                                    <span class="icon"><i class='bx bx-tag-alt'></i></span>
                                    <span class="link">Lời mở đầu</span>

                                </router-link>
                            </li>
                            <li class="list">
                                <router-link to="/admin/moTaDichVu" class="nav-link" @click="highlightMenu('moTaDichVu')"
                                    :class="{ active: activeMenu === 'moTaDichVu' }">
                                    <span class="icon"><i class='bx bx-tag-alt'></i></span>
                                    <span class="link">Mô tả dịch vụ</span>

                                </router-link>
                            </li>
                            <li class="list">
                                <router-link to="/admin/damCuoi" class="nav-link" @click="highlightMenu('damCuoi')"
                                    :class="{ active: activeMenu === 'damCuoi' }">
                                    <span class="icon"><i class='bx bx-tag-alt'></i></span>
                                    <span class="link">Đám cưới</span>

                                </router-link>
                            </li>
                           
                           
                        </ul>
                    </li>
                    <li class="list">
                        <a class="nav-link" @click="menu2Expanded = !menu2Expanded">
                            <span class="icon"><i class="bx bx-category icon"></i></span>
                            <span class="link">Giới thiệu</span>
                            <i class="bx" :class="menu2Expanded ? 'bx-chevron-up' : 'bx-chevron-down'"></i>
                        </a>
                        <ul v-show="menu2Expanded" class="sub-menu">
                            <li class="list">
                                <router-link to="/admin/about" class="nav-link" @click="highlightMenu('category')"
                                    :class="{ active: activeMenu === 'category' }">
                                    <span class="icon"><i class='bx bx-tag-alt'></i></span>
                                    <span class="link">giới thiệu</span>

                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="list">
                        <a class="nav-link" @click="menu3Expanded = !menu3Expanded">
                            <span class="icon"><i class="bx bx-package icon"></i></span>
                            <span class="link">Dịch vụ</span>
                            <i class="bx" :class="menu3Expanded ? 'bx-chevron-up' : 'bx-chevron-down'"></i>
                        </a>
                        <ul v-show="menu3Expanded" class="sub-menu">
                            <li class="list">
                                <router-link to="/admin/service" class="nav-link" @click="highlightMenu('product')"
                                    :class="{ active: activeMenu === 'product' }">
                                    <span class="icon"><i class='bx bx-tag-alt'></i></span>
                                    <span class="link">dịch vụ</span>

                                </router-link>
                            </li>
                        </ul>
                    </li>


                    <li class="list">
                        <a class="nav-link" @click="menu4Expanded = !menu4Expanded">
                            <span class="icon"><i class="bx bx-extension icon"></i></span>
                            <span class="link">Hành trình</span>
                            <i class="bx" :class="menu4Expanded ? 'bx-chevron-up' : 'bx-chevron-down'"></i>
                        </a>
                        <ul v-show="menu4Expanded" class="sub-menu">
                            <li class="list">
                                <router-link to="/admin/categoryAlbum" class="nav-link" @click="highlightMenu('banner')"
                                    :class="{ active: activeMenu === 'banner' }">
                                    <span class="icon"><i class='bx bx-tag-alt'></i></span>
                                    <span class="link">Thể loại</span>
                                </router-link>
                            </li>
                            <li class="list">
                                <router-link to="/admin/album" class="nav-link" @click="highlightMenu('banner')"
                                    :class="{ active: activeMenu === 'banner' }">
                                    <span class="icon"><i class='bx bx-tag-alt'></i></span>
                                    <span class="link">Hành trình</span>
                                </router-link>
                            </li>
                          
                        </ul>
                    </li>

                    <li class="list">
                        <a class="nav-link" @click="menu5Expanded = !menu5Expanded">
                            <span class="icon"><i class="bx bx-bulb icon"></i></span>
                            <span class="link">Logo</span>
                            <i class="bx" :class="menu5Expanded ? 'bx-chevron-up' : 'bx-chevron-down'"></i>
                        </a>
                        <ul v-show="menu5Expanded" class="sub-menu">
                            <li class="list">
                                <router-link to="/admin/logo" class="nav-link" @click="highlightMenu('logo')"
                                    :class="{ active: activeMenu === 'logo' }">
                                    <span class="icon"><i class='bx bx-tag-alt'></i></span>
                                    <span class="link">Logo</span>

                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="list">
                        <a class="nav-link" @click="menu11Expanded = !menu11Expanded">
                            <span class="icon"><i class="bx bx-layer icon"></i></span>
                            <span class="link">Video</span>
                            <i class="bx" :class="menu11Expanded ? 'bx-chevron-up' : 'bx-chevron-down'"></i>
                        </a>
                        <ul v-show="menu11Expanded" class="sub-menu">
                            <li class="list">
                                <router-link to="/admin/video1" class="nav-link" @click="highlightMenu('order')"
                                    :class="{ active: activeMenu === 'order' }">
                                    <span class="icon"><i class='bx bx-tag-alt'></i></span>
                                    <span class="link">video</span>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="list">
                        <a class="nav-link" @click="menu10Expanded = !menu10Expanded">
                            <span class="icon"><i class="bx bx-layer icon"></i></span>
                            <span class="link">Đánh giá</span>
                            <i class="bx" :class="menu10Expanded ? 'bx-chevron-up' : 'bx-chevron-down'"></i>
                        </a>
                        <ul v-show="menu10Expanded" class="sub-menu">
                            <li class="list">
                                <router-link to="/admin/blog" class="nav-link" @click="highlightMenu('order')"
                                    :class="{ active: activeMenu === 'order' }">
                                    <span class="icon"><i class='bx bx-tag-alt'></i></span>
                                    <span class="link">blog</span>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="list">
                        <a class="nav-link" @click="menu12Expanded = !menu12Expanded">
                            <span class="icon"><i class="bx bx-layer icon"></i></span>
                            <span class="link">Liên hệ</span>
                            <i class="bx" :class="menu12Expanded ? 'bx-chevron-up' : 'bx-chevron-down'"></i>
                        </a>
                        <ul v-show="menu12Expanded" class="sub-menu">
                            <li class="list">
                                <router-link to="/admin/contact" class="nav-link" @click="highlightMenu('order')"
                                    :class="{ active: activeMenu === 'order' }">
                                    <span class="icon"><i class='bx bx-tag-alt'></i></span>
                                    <span class="link">Liên hệ</span>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="content_Admin">
            <router-view>
            </router-view>
        </div>
    </div>
    <div class="footer_Admin">
    </div>
</template>

<script>
import '../assets/css/admin.css';
import footerV from '../views-admin/footer.vue';

export default {
    components: {
        footerV,
    },
    data() {
        return {
            menu1Expanded: false, // Sử dụng để theo dõi trạng thái mở/rút menu con của menu cha 1
            menu2Expanded: false,
            menu3Expanded: false,
            menu4Expanded: false,
            menu5Expanded: false,
            menu6Expanded: false,
            menu7Expanded: false,
            menu8Expanded: false,
            menu9Expanded: false,
            menu10Expanded: false,
            menu11Expanded: false,
            menu12Expanded: false,
            menu13Expanded: false,
            sidebarCollapsed: false, // Khởi tạo trạng thái mở rộng
            activeMenu: null,
            menuOpen: false,
        };
    },
    methods: {
       
        toggleMobileSidebar() {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                const sidebarLeft = window.getComputedStyle(sidebar).getPropertyValue('left');
                if (sidebarLeft === '0px') {
                    sidebar.style.left = '-2510px'; // Ẩn sidebar bên trái
                    this.menuOpen = false; // Đặt trạng thái menu là false
                } else {
                    sidebar.style.left = '0px'; // Hiển thị sidebar
                    this.menuOpen = true; // Đặt trạng thái menu là true
                }
            }
        },
        highlightMenu(menuKey) {
            this.activeMenu = menuKey;
        },
        logout(event) {
            event.stopPropagation();
            localStorage.removeItem('admin');
            this.$router.push('/admin_login');
        },
    },
};
</script>
