<template>
    <section
        class="elementor-section elementor-top-section elementor-element elementor-element-30bf16c6 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
        data-id="30bf16c6" data-element_type="section"
        data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
        <div class="elementor-container elementor-column-gap-default">
            <div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-7462dd21"
                data-id="7462dd21" data-element_type="column">
                <div class="elementor-widget-wrap elementor-element-populated">
                    <div class="elementor-element elementor-element-148c073c elementor-widget elementor-widget-heading"
                        data-id="148c073c" data-element_type="widget" data-widget_type="heading.default">
                        <div class="elementor-widget-container">

                            <h5 class="elementor-heading-title elementor-size-default">| DỊCH VỤ |</h5>
                        </div>
                    </div>
                    <div v-for="(data, index) in motadichvu" :key="index"
                        class="elementor-element elementor-element-f4189a2 elementor-widget elementor-widget-text-editor"
                        data-id="f4189a2" data-element_type="widget" data-widget_type="text-editor.default">
                        <div class="elementor-widget-container">
                            <p>{{ data.motadichvu }}</p>
                        </div>
                    </div>
                    <section 
                        class="elementor-section elementor-inner-section elementor-element elementor-element-4dd7bfc elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                        data-id="4dd7bfc" data-element_type="section">
                        <div class="elementor-container elementor-column-gap-default" >
                            <div v-for="a in service" class="elementor-column elementor-col-20 elementor-inner-column elementor-element elementor-element-ff7e152"
                                data-id="ff7e152" data-element_type="column">
                                <div class="elementor-widget-wrap elementor-element-populated">
                                    <div class="elementor-element elementor-element-fba5e4f elementor-widget elementor-widget-heading"
                                        data-id="fba5e4f" data-element_type="widget" data-widget_type="heading.default">
                                        <div class="elementor-widget-container">
                                            <h2 class="elementor-heading-title elementor-size-default">
                                                <router-link :to="'/service-detail/'+ a.duongdanchitiet" 
                                                    title="Wedding Planner">{{ a.tendichvu }}</router-link>
                                            </h2>
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
            loiMoDau: [],
            id: null,
            tieude: '',
            motadichvu: '',
            service: [],
        };
    },
    components: {
        toast,
    },
    async created() {
        await this.getMoTaDichVu();
        await this.getService();
    },
    methods: {
        async getMoTaDichVu() {
            try {
                const result = await this.$axios.get('getMoTaDichVu');
                if (result.data && result.data.length > 0) {
                    const data = result.data[0];
                    this.id = data.id;
                    this.motadichvu = data.motadichvu;
                    this.motadichvu = [result.data[0]]; // Chuyển đối tượng thành mảng chứa một phần tử
                } else {
                    console.log('Không tìm thấy mô tả dịch vụ');
                    this.$refs.toast.showToast('Không tìm thấy mô tả dịch vụ');
                }
            } catch (e) {
                console.error('Lỗi khi lấy mô tả dịch vụ:', e);
                this.$refs.toast.showToast('Lỗi khi tải mô tả dịch vụ');
            }
        },
        async getService() {
      try {
        const response = await this.$axios.get('getService');
        this.service = response.data;
        console.log(this.service)
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ server', error);
        this.$refs.toast.showToast('Lỗi khi lấy dữ liệu');
      }
    },

    },
};
</script>
<style scoped>
a {
    color: black;
}

a:hover {
    text-decoration: none;
}

.elementor-section.elementor-section-boxed>.elementor-container {
    max-width: 1400px;
    justify-content: center;
    text-align: center;
}
</style>