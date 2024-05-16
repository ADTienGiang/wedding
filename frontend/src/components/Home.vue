<template>

    <body
        class="home page-template page-template-elementor_theme page page-id-4102 wp-custom-logo stk--is-helloelementor-theme elementor-default elementor-kit-682 elementor-page elementor-page-4102">

        <header1 />

        <main id="content" class="site-main post-4102 page type-page status-publish hentry">
            <div class="page-content">
                <div data-elementor-type="wp-page" data-elementor-id="4102" class="elementor elementor-4102 elementor-5"
                    data-elementor-post-type="page">
                    <banner1 />
                    <loiMoDau />
                    <motaDichVu />
                    <wedding />
                </div>
                <div class="post-tags">
                </div>
            </div>


        </main>

        <footer1 />

    </body>
</template>
<script>

import header1 from '../components/header.vue';
import footer1 from '../components/footer.vue';
import banner1 from '../components/componentHome/banner.vue';
import loiMoDau from '../components/componentHome/loiMoDau.vue';
import motaDichVu from '../components/componentHome/moTaDichVu.vue';
import wedding from '../components/componentHome/wedding.vue';
import workingwith from '../components/componentHome/workingWith.vue'
export default
    {
        data() {
            return {
                desktopBanners: [],
                mobileBanners: [],
            };
        },
        components:
        {
            header1,
            footer1,
            banner1,
            loiMoDau,
            motaDichVu,
            wedding,
            workingwith
        },
        async created() {
            await this.getBannerData();
        },
        methods: {
            async getBannerData() {
                try {
                    const response = await this.$axios.get(`getBannerHome`);
                    this.desktopBanners = response.data.filter(banner => banner.kichthuoc === '1900x1000');
                    this.mobileBanners = response.data.filter(banner => banner.kichthuoc === '800x1000');
                    console.log('Desktop Banners:', this.desktopBanners);
                    console.log('Mobile Banners:', this.mobileBanners);
                } catch (error) {
                    console.error('Error fetching banners from server:', error);
                }
            },

        },

        watch: {
            desktopBanners(newBanners) {
                this.$nextTick(() => {
                    // Mã khởi tạo swiper ở đây
                    new Swiper('.swiper-container', {
                        // các tùy chọn
                    });
                });
            }
        }
    }
</script>
