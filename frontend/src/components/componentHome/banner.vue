<template>
    <section
        class="elementor-section elementor-top-section elementor-element elementor-element-eee4df3 elementor-section-full_width elementor-section-stretched elementor-section-height-default elementor-section-height-default"
        data-id="eee4df3" data-element_type="section"
        data-settings="{&quot;stretch_section&quot;:&quot;section-stretched&quot;,&quot;background_background&quot;:&quot;classic&quot;}">
        <div class="elementor-container elementor-column-gap-no">
            <div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-8486a1d"
                data-id="8486a1d" data-element_type="column">
                <div class="elementor-widget-wrap elementor-element-populated">
                    <div class="elementor-element elementor-element-cd18b5a elementor-hidden-mobile elementor-arrows-position-inside elementor-widget elementor-widget-image-carousel"
                        data-id="cd18b5a" data-element_type="widget"
                        data-settings="{&quot;slides_to_show&quot;:&quot;1&quot;,&quot;navigation&quot;:&quot;arrows&quot;,&quot;lazyload&quot;:&quot;yes&quot;,&quot;pause_on_hover&quot;:&quot;no&quot;,&quot;speed&quot;:4000,&quot;autoplay&quot;:&quot;yes&quot;,&quot;pause_on_interaction&quot;:&quot;yes&quot;,&quot;autoplay_speed&quot;:5000,&quot;infinite&quot;:&quot;yes&quot;,&quot;effect&quot;:&quot;slide&quot;}"
                        data-widget_type="image-carousel.default">
                        <div v-if="desktopBanners.length > 0" class="elementor-widget-container">
                            <div class="elementor-image-carousel-wrapper swiper-container" dir="ltr">
                                <div class="elementor-image-carousel swiper-wrapper swiper-image-stretch"
                                    aria-live="off">
                                    <div v-for="(banner, index) in desktopBanners" :key="index" class="swiper-slide">
                                        <figure class="swiper-slide-inner">
                                            <img class="swiper-slide-image swiper-lazy" :src="banner.duongDan"
                                                :alt="`Banner ${index + 1}`" />
                                        </figure>
                                    </div>
                                </div>
                                <div class="elementor-swiper-button elementor-swiper-button-prev" role="button"
                                    tabindex="0">
                                    <i class='bx bx-chevron-left' ></i>                                </div>
                                <div class="elementor-swiper-button elementor-swiper-button-next" role="button"
                                    tabindex="0">
                                    <i class='bx bx-chevron-right' ></i>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="elementor-element elementor-element-39b8977 elementor-hidden-desktop elementor-hidden-tablet elementor-arrows-position-inside elementor-widget elementor-widget-image-carousel"
                        data-id="39b8977" data-element_type="widget"
                        data-settings="{&quot;slides_to_show&quot;:&quot;1&quot;,&quot;navigation&quot;:&quot;arrows&quot;,&quot;lazyload&quot;:&quot;yes&quot;,&quot;pause_on_hover&quot;:&quot;no&quot;,&quot;speed&quot;:4000,&quot;autoplay&quot;:&quot;yes&quot;,&quot;pause_on_interaction&quot;:&quot;yes&quot;,&quot;autoplay_speed&quot;:5000,&quot;infinite&quot;:&quot;yes&quot;,&quot;effect&quot;:&quot;slide&quot;}"
                        data-widget_type="image-carousel.default">
                        <div v-if="mobileBanners.length > 0" class="elementor-widget-container">
                            <div class="elementor-image-carousel-wrapper swiper-container" dir="ltr">
                                <div class="elementor-image-carousel swiper-wrapper swiper-image-stretch"
                                    aria-live="off">
                                    <div v-for="(banner, index) in mobileBanners" :key="index" class="swiper-slide"
                                        role="group" aria-roledescription="slide">
                                        <figure class="swiper-slide-inner">
                                            <img class="swiper-slide-image swiper-lazy" :src="banner.duongDan"
                                                :alt="`Banner ${index + 1}`" />
                                            <div class="swiper-lazy-preloader"></div>
                                        </figure>
                                    </div>

                                </div>
                                <div class="elementor-swiper-button elementor-swiper-button-prev" role="button"
                                    tabindex="0">
                                    <i aria-hidden="true" class="eicon-chevron-left"></i>
                                </div>
                                <div class="elementor-swiper-button elementor-swiper-button-next" role="button"
                                    tabindex="0">
                                    <i aria-hidden="true" class="eicon-chevron-right"></i>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>

export default
    {
        data() {
            return {
                desktopBanners: [],
                mobileBanners: [],
            };
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