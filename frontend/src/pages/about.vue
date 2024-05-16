<template>

    <body
        class="page-template-default page page-id-4104 wp-custom-logo stk--is-helloelementor-theme elementor-default elementor-kit-682 elementor-page elementor-page-4104">
        <header1 />
        <main id="content" class="site-main post-4104 page type-page status-publish hentry" v-for="a in about">
            <div class="page-content">
                <div data-elementor-type="wp-post" data-elementor-id="4104" class="elementor elementor-4104 elementor-8"
                    data-elementor-post-type="page">
                    <section
                        class="elementor-section elementor-top-section elementor-element elementor-element-b2574b1 elementor-section-full_width elementor-section-stretched elementor-section-height-default elementor-section-height-default"
                        data-id="b2574b1" data-element_type="section"
                        data-settings="{&quot;stretch_section&quot;:&quot;section-stretched&quot;}">
                        <div class="elementor-container elementor-column-gap-no">
                            <div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-7d3918a3"
                                data-id="7d3918a3" data-element_type="column">
                                <div class="elementor-widget-wrap elementor-element-populated">
                                    <div class="elementor-element elementor-element-6743512e elementor-widget elementor-widget-image"
                                        data-id="6743512e" data-element_type="widget" data-widget_type="image.default">
                                        <div class="elementor-widget-container">
                                            <img decoding="async" width="1920" height="600"
                                                :src="a.banner"
                                                class="attachment-2048x2048 size-2048x2048 wp-image-3306"
                                                :alt="a.tieudechinh"/>
                                          
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section
                        class="elementor-section elementor-top-section elementor-element elementor-element-5011282 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                        data-id="5011282" data-element_type="section"
                        data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                        <div class="elementor-container elementor-column-gap-default">
                            <div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-57f76b3"
                                data-id="57f76b3" data-element_type="column">
                                <div class="elementor-widget-wrap elementor-element-populated">
                                    <section
                                        class="elementor-section elementor-inner-section elementor-element elementor-element-382b426 elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                        data-id="382b426" data-element_type="section"
                                        data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                                        <div class="elementor-container elementor-column-gap-default">
                                            <div class="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-3219767"
                                                data-id="3219767" data-element_type="column">
                                                <div class="elementor-widget-wrap elementor-element-populated">
                                                    <div class="elementor-element elementor-element-aef5f4b elementor-widget elementor-widget-heading"
                                                        data-id="aef5f4b" data-element_type="widget"
                                                        data-widget_type="heading.default">
                                                        <div class="elementor-widget-container">

                                                            <h5 class="elementor-heading-title elementor-size-default">|
                                                                GIỚI THIỆU |</h5>
                                                        </div>
                                                    </div>
                                                    <div class="elementor-element elementor-element-ebecf9a uael-dual-heading-align-center elementor-widget elementor-widget-uael-dual-color-heading"
                                                        data-id="ebecf9a" data-element_type="widget"
                                                        data-widget_type="uael-dual-color-heading.default">
                                                        <div class="elementor-widget-container">
                                                            <div
                                                                class="uael-module-content uael-dual-color-heading uael-heading-stack-none">
                                                                <h2>
                                                                    <span class="uael-before-heading"><span
                                                                            class="elementor-inline-editing uael-dual-heading-text uael-first-text"
                                                                            data-elementor-setting-key="before_heading_text"
                                                                            data-elementor-inline-editing-toolbar="basic">
                                                                            {{a.tieudechinh}}</span></span>
                                                                </h2>
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
                    <section
                        class="elementor-section elementor-top-section elementor-element elementor-element-f72b135 elementor-section-full_width elementor-section-height-default elementor-section-height-default"
                        data-id="f72b135" data-element_type="section">
                        <div class="elementor-container elementor-column-gap-no" v-for="b in a.partabout">
                            <div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-656326f"
                                data-id="656326f" data-element_type="column">
                                <div class="elementor-widget-wrap elementor-element-populated">
                                    <div class="elementor-element elementor-element-51c9a40f elementor-hidden-mobile elementor-widget elementor-widget-heading"
                                        data-id="51c9a40f" data-element_type="widget"
                                        data-widget_type="heading.default">
                                        <div class="elementor-widget-container">
                                            <h1 class="elementor-heading-title elementor-size-default">{{ b.tieudephu }}</h1>
                                        </div>
                                    </div>
                                  
                                    <div class="elementor-element elementor-element-12d2ca75 elementor-widget elementor-widget-text-editor"
                                        data-id="12d2ca75" data-element_type="widget"
                                        data-widget_type="text-editor.default">
                                        <div class="elementor-widget-container">
                                            {{ b.noidung }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-3354eb4"
                                data-id="3354eb4" data-element_type="column">
                                <div class="elementor-widget-wrap elementor-element-populated" v-for="c in b.partaboutimg">
                                    <div class="elementor-element elementor-element-25c86b61 elementor-widget elementor-widget-image"
                                        data-id="25c86b61" data-element_type="widget" data-widget_type="image.default">
                                        <div class="elementor-widget-container">
                                            <img decoding="async" width="1068" height="999"
                                                :src="c.duongDan"
                                                class="attachment-2048x2048 size-2048x2048 wp-image-2571"
                                                :alt="b.tieudephu"/>
                                                
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
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
export default
    {
        data() {
            return {
                about: [],
            };
        },
        components:
        {
            header1,
            footer1
        },
        async mounted() {
            await this.getAbout();
        },
        methods: {
            async getAbout() {
                try {
                    const response = await this.$axios.get('getAbout');
                    this.about = response.data;
                    console.log(this.about)
                } catch (error) {
                    console.error('Error fetching about details:', error);
                    this.$refs.toast.showToast('Error loading introduction');
                }
            },
        }
    }
</script>