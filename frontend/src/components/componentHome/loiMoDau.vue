<template>
    <section
        class="elementor-section elementor-top-section elementor-element elementor-element-d63f15a elementor-section-boxed elementor-section-height-default elementor-section-height-default"
        data-id="d63f15a" data-element_type="section"
        data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
        <div class="elementor-container elementor-column-gap-default">
            <div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-781c1b6"
                data-id="781c1b6" data-element_type="column">
                <div class="elementor-widget-wrap elementor-element-populated">
                    <section
                        class="elementor-section elementor-inner-section elementor-element elementor-element-d6a116f elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                        data-id="d6a116f" data-element_type="section"
                        data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                        <div v-for="(loiMoDau, index) in LoiMoDau" :key="index"
                            class="elementor-container elementor-column-gap-default">
                            <div class="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-6ffd478"
                                data-id="6ffd478" data-element_type="column">
                                <div class="elementor-widget-wrap elementor-element-populated">
                                    <div class="elementor-element elementor-element-af2ff03 uael-dual-heading-align-center elementor-widget elementor-widget-uael-dual-color-heading"
                                        data-id="af2ff03" data-element_type="widget"
                                        data-widget_type="uael-dual-color-heading.default">
                                        <div class="elementor-widget-container">
                                            <div
                                                class="uael-module-content uael-dual-color-heading uael-heading-stack-none">
                                                <h2>
                                                    <span class="uael-before-heading"><span
                                                            class="elementor-inline-editing uael-dual-heading-text uael-first-text"
                                                            data-elementor-setting-key="before_heading_text"
                                                            data-elementor-inline-editing-toolbar="basic">Tasteful,</span></span><span
                                                        class="uael-adv-heading-stack"><span
                                                            class="elementor-inline-editing uael-dual-heading-text uael-highlight-text"
                                                            data-elementor-setting-key="second_heading_text"
                                                            data-elementor-inline-editing-toolbar="basic">
                                                            distinctive </span></span><span
                                                        class="uael-after-heading"><span
                                                            class="elementor-inline-editing uael-dual-heading-text uael-third-text"
                                                            data-elementor-setting-key="after_heading_text"
                                                            data-elementor-inline-editing-toolbar="basic">{{
                                                            loiMoDau.tieude }}</span></span>
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-9160196"
                                data-id="9160196" data-element_type="column">
                                <div class="elementor-widget-wrap elementor-element-populated">
                                    <div class="elementor-element elementor-element-7fb3894 elementor-hidden-mobile elementor-hidden-tablet elementor-widget elementor-widget-text-editor"
                                        data-id="7fb3894" data-element_type="widget"
                                        data-widget_type="text-editor.default">
                                        <div class="elementor-widget-container">
                                            <p>{{ loiMoDau.noidung }}</p>
                                        </div>
                                    </div>
                                    <div class="elementor-element elementor-element-fdfe745 elementor-mobile-align-center elementor-tablet-align-center elementor-widget elementor-widget-button"
                                        data-id="fdfe745" data-element_type="widget" data-widget_type="button.default">
                                        <div class="elementor-widget-container">
                                            <div class="elementor-button-wrapper">
                                                <router-link
                                                    class="elementor-button elementor-button-link elementor-size-sm"
                                                    to="/lien-he">
                                                    <span class="elementor-button-content-wrapper">
                                                        <span class="elementor-button-icon elementor-align-icon-right">
                                                            <i class='bx bx-right-arrow-alt'></i>
                                                        </span>
                                                        <span class="elementor-button-text">Talk to us</span>
                                                    </span>
                                                </router-link>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import toast from '../../components/toast.vue';
export default {
    data() {
        return {
            id: null,
            LoiMoDau: []
        };
    },
    components: {
        toast,
    },
    async created() {
        await this.getLoiMoDau();
    },
    methods: {

        async getLoiMoDau() {
            try {
                const result = await this.$axios.get('getLoiMoDau');
                if (result.data && result.data.length > 0) {
                    // Đảm bảo gán một mảng cho LoiMoDau
                    this.LoiMoDau = [result.data[0]]; // Chuyển đối tượng thành mảng chứa một phần tử
                } else {
                    console.log('Không tìm thấy lời mở đầu');
                    this.$refs.toast.showToast('Không tìm thấy lời mở đầu');
                }
            } catch (e) {
                console.error('Lỗi khi lấy lời mở đầu:', e);
                this.$refs.toast.showToast('Lỗi khi tải lời mở đầu');
            }
        }


    },
};
</script>
<style scoped>
a{
    text-decoration: none;
}
</style>