<template>
    <header1 />
    <div v-if="weddingDetail" data-elementor-type="single-post" data-elementor-id="5016"
        class="elementor elementor-5016 elementor-5008 elementor-location-single post-25267 wedding-works type-wedding-works status-publish has-post-thumbnail hentry location-ha-noi-vi"
        data-elementor-post-type="elementor_library">
        <section
            class="elementor-section elementor-top-section elementor-element elementor-element-72930bae elementor-section-height-min-height elementor-section-boxed elementor-section-height-default elementor-section-items-middle"
            data-id="72930bae" data-element_type="section"
            data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
            <div class="elementor-container elementor-column-gap-default">
                <div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-59701d4f"
                    data-id="59701d4f" data-element_type="column">
                    <div class="elementor-widget-wrap">
                        <img :src="weddingDetail.banner" alt="">
                    </div>
                </div>
            </div>
        </section>
        <section
            class="elementor-section elementor-top-section elementor-element elementor-element-5bdf0985 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
            data-id="5bdf0985" data-element_type="section">
            <div class="elementor-container elementor-column-gap-default">
                <div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-661d53ec"
                    data-id="661d53ec" data-element_type="column">
                    <div class="elementor-widget-wrap elementor-element-populated">
                        <div class="elementor-element elementor-element-5253bf21 elementor-widget elementor-widget-heading"
                            data-id="5253bf21" data-element_type="widget" data-widget_type="heading.default">
                            <div class="elementor-widget-container">

                                <h1 class="elementor-heading-title elementor-size-default">{{ weddingDetail.tieude }}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section
            class="elementor-section elementor-top-section elementor-element elementor-element-3fae330 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
            data-id="3fae330" data-element_type="section"
            data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
            <div class="elementor-container elementor-column-gap-default">
                <div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-360bc65"
                    data-id="360bc65" data-element_type="column"
                    data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                    <div class="elementor-widget-wrap elementor-element-populated">
                        <section
                            class="elementor-section elementor-inner-section elementor-element elementor-element-f0de595 elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                            data-id="f0de595" data-element_type="section">
                            <div class="elementor-container elementor-column-gap-narrow">
                                <div class="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-29d0587"
                                    data-id="29d0587" data-element_type="column">
                                    <div class="elementor-widget-wrap elementor-element-populated">
                                        <div class="elementor-element elementor-element-47f0622 elementor-widget elementor-widget-heading"
                                            data-id="47f0622" data-element_type="widget"
                                            data-widget_type="heading.default">
                                            <div class="elementor-widget-container">
                                                <h5 class="elementor-heading-title elementor-size-default">CLIENT:</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-24a2b1f"
                                    data-id="24a2b1f" data-element_type="column">
                                    <div class="elementor-widget-wrap elementor-element-populated">
                                        <div class="elementor-element elementor-element-057f7a7 elementor-widget elementor-widget-heading"
                                            data-id="057f7a7" data-element_type="widget"
                                            data-widget_type="heading.default">
                                            <div class="elementor-widget-container">
                                                <h4 class="elementor-heading-title elementor-size-default">{{
                                                    weddingDetail.capdoi }}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section
                            class="elementor-section elementor-inner-section elementor-element elementor-element-0c13dbe elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                            data-id="0c13dbe" data-element_type="section">
                            <div class="elementor-container elementor-column-gap-narrow">
                                <div class="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-9c5fb5d"
                                    data-id="9c5fb5d" data-element_type="column">
                                    <div class="elementor-widget-wrap elementor-element-populated">
                                        <div class="elementor-element elementor-element-c19762a elementor-widget elementor-widget-heading"
                                            data-id="c19762a" data-element_type="widget"
                                            data-widget_type="heading.default">
                                            <div class="elementor-widget-container">
                                                <h5 class="elementor-heading-title elementor-size-default">
                                                    NATIONALITIES:</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-db101b0"
                                    data-id="db101b0" data-element_type="column">
                                    <div class="elementor-widget-wrap elementor-element-populated">
                                        <div class="elementor-element elementor-element-b76aa75 elementor-widget elementor-widget-heading"
                                            data-id="b76aa75" data-element_type="widget"
                                            data-widget_type="heading.default">
                                            <div class="elementor-widget-container">
                                                <h4 class="elementor-heading-title elementor-size-default">{{
                                                    weddingDetail.quoctich }}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section
                            class="elementor-section elementor-inner-section elementor-element elementor-element-8fb9f0b elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                            data-id="8fb9f0b" data-element_type="section">
                            <div class="elementor-container elementor-column-gap-narrow">
                                <div class="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-331ec11"
                                    data-id="331ec11" data-element_type="column">
                                    <div class="elementor-widget-wrap elementor-element-populated">
                                        <div class="elementor-element elementor-element-d57b5ed elementor-widget elementor-widget-heading"
                                            data-id="d57b5ed" data-element_type="widget"
                                            data-widget_type="heading.default">
                                            <div class="elementor-widget-container">
                                                <h5 class="elementor-heading-title elementor-size-default">CONCEPT:
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-6f67931"
                                    data-id="6f67931" data-element_type="column">
                                    <div class="elementor-widget-wrap elementor-element-populated">
                                        <div class="elementor-element elementor-element-191d594 elementor-widget elementor-widget-heading"
                                            data-id="191d594" data-element_type="widget"
                                            data-widget_type="heading.default">
                                            <div class="elementor-widget-container">
                                                <h4 class="elementor-heading-title elementor-size-default">{{
                                                    weddingDetail.ytuong }}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section
                            class="elementor-section elementor-inner-section elementor-element elementor-element-0d908fb elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                            data-id="0d908fb" data-element_type="section">
                            <div class="elementor-container elementor-column-gap-narrow">
                                <div class="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-1a353cd"
                                    data-id="1a353cd" data-element_type="column">
                                    <div class="elementor-widget-wrap elementor-element-populated">
                                        <div class="elementor-element elementor-element-c85af1b elementor-widget elementor-widget-heading"
                                            data-id="c85af1b" data-element_type="widget"
                                            data-widget_type="heading.default">
                                            <div class="elementor-widget-container">
                                                <h5 class="elementor-heading-title elementor-size-default">NUMBER OF
                                                    GUESTS: </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-45f77b2"
                                    data-id="45f77b2" data-element_type="column">
                                    <div class="elementor-widget-wrap elementor-element-populated">
                                        <div class="elementor-element elementor-element-dc9360a elementor-widget elementor-widget-heading"
                                            data-id="dc9360a" data-element_type="widget"
                                            data-widget_type="heading.default">
                                            <div class="elementor-widget-container">
                                                <h4 class="elementor-heading-title elementor-size-default">{{
                                                    weddingDetail.soluongkhach }}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section
                            class="elementor-section elementor-inner-section elementor-element elementor-element-0cb9c71 elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                            data-id="0cb9c71" data-element_type="section">
                            <div class="elementor-container elementor-column-gap-narrow">
                                <div class="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-33b627d"
                                    data-id="33b627d" data-element_type="column">
                                    <div class="elementor-widget-wrap elementor-element-populated">
                                        <div class="elementor-element elementor-element-4b4642e elementor-widget elementor-widget-heading"
                                            data-id="4b4642e" data-element_type="widget"
                                            data-widget_type="heading.default">
                                            <div class="elementor-widget-container">
                                                <h5 class="elementor-heading-title elementor-size-default">LOCATION:
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-d0cf115"
                                    data-id="d0cf115" data-element_type="column">
                                    <div class="elementor-widget-wrap elementor-element-populated">
                                        <div class="elementor-element elementor-element-75839bd elementor-widget elementor-widget-heading"
                                            data-id="75839bd" data-element_type="widget"
                                            data-widget_type="heading.default">
                                            <div class="elementor-widget-container">
                                                <h4 class="elementor-heading-title elementor-size-default">{{
                                                    weddingDetail.diadiem }}</h4>
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
        <section
            class="elementor-section elementor-top-section elementor-element elementor-element-4bf59cfd elementor-section-boxed elementor-section-height-default elementor-section-height-default"
            data-id="4bf59cfd" data-element_type="section">
            <div class="elementor-container elementor-column-gap-default">
                <div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-50756d5f"
                    data-id="50756d5f" data-element_type="column">
                    <div class="elementor-widget-wrap elementor-element-populated">
                        <div class="elementor-element elementor-element-97179c5 elementor-widget elementor-widget-theme-post-content"
                            data-id="97179c5" data-element_type="widget" data-widget_type="theme-post-content.default">
                            <div class="elementor-widget-container">
                                <div class="elementor-widget-container"
                                v-for="part in weddingDetail.part" :key="part.id">
                                <component :is="'layout' + part.bocuc" :part-data="part" :stt="part.stt"></component>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    </div>
    <footer1 />
</template>
<script>
import header1 from '../components/header.vue';
import footer1 from '../components/footer.vue';
import layout1 from '../components/componentHome/layout-wedding-user/layout1.vue';
import layout2 from '../components/componentHome/layout-wedding-user/layout2.vue';
import layout3 from '../components/componentHome/layout-wedding-user/layout3.vue';
import layout4 from '../components/componentHome/layout-wedding-user/layout4.vue';
import layout5 from '../components/componentHome/layout-wedding-user/layout5.vue';
import layout6 from '../components/componentHome/layout-wedding-user/layout6.vue';
import layout7 from '../components/componentHome/layout-wedding-user/layout7.vue';
import layout8 from '../components/componentHome/layout-wedding-user/layout8.vue';
import layout9 from '../components/componentHome/layout-wedding-user/layout9.vue';
import layout10 from '../components/componentHome/layout-wedding-user/layout10.vue';
import layout11 from '../components/componentHome/layout-wedding-user/layout11.vue';
export default {
    components:
    {
        header1,
        footer1,
        layout1,
        layout2,
        layout3,
        layout4,
        layout5,
        layout6,
        layout7,
        layout8,
        layout9,
        layout10,
        layout11,
    },
    data() {
        return {
            weddings: [],
            weddingDetail: null,
        };
    },
    async created() {
        await this.getWedding();
        this.filterWeddingByPath();
    },
    methods: {
        async getWedding() {
            try {
                const response = await this.$axios.get(`getWedding`)
                this.weddings = response.data;
                console.log(this.weddings);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu đám cưới:", error);
            }
        },
        filterWeddingByPath() {
            const path = this.$route.params.duong_dan_wedding_works;
            this.weddingDetail = this.weddings.find(wd => wd.duongdan === path);
            console.log(this.weddingDetail)
        }

    },
}
</script>
