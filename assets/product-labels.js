class ProductLabelManager {
    constructor() {
        this.language = Shopify.locale;
        this.body = $('body');
        this.oldHref = window.location.href;
        this.init();
    }

    init() {
        this.setupInitialLabels();
        this.setupUrlChangeListener();
        this.setupCustomEventListeners();
    }

    setupInitialLabels() {
        setTimeout(() => {
            this.setProductBlockLabels();
            if (this.isProductPage()) {
                this.setProductPageLabels();
            }
        }, 1000);
    }

    setupUrlChangeListener() {
        setInterval(() => {
            if (window.location.href !== this.oldHref) {
                this.oldHref = window.location.href;
                setTimeout(() => {
                    this.setProductBlockLabels();
                    if (this.isProductPage()) {
                        this.setProductPageLabels();
                    }
                }, 500);
            }
        }, 100);
    }

    setupCustomEventListeners() {
        document.addEventListener('onurlchanged', () => {
            setTimeout(() => this.setProductBlockLabels(), 1000);
        });
    }

    isProductPage() {
        return window.location.href.includes('/products/');
    }

    normalizeTag(tag) {
        return tag.toLowerCase().trim();
    }

    generateLabelHTML(labelData, tag) {
        const message = this.language === 'en' ? labelData.message : labelData.message_fr;
        const className = `product-label product-label--sale product-label-${tag}`;
        
        return `
            <span class="${className}">
                <span style="background-color:${labelData.bg_color};color:${labelData.fg_color};">${message}</span>
            </span>
        `;
    }

    mergeLabelContainers($containers) {
        if ($containers.length <= 1) return $containers.first();

        const $firstContainer = $containers.first();
        for (let i = 1; i < $containers.length; i++) {
            $firstContainer.append($containers.eq(i).html());
            $containers.eq(i).remove();
        }
        return $firstContainer;
    }

    getLabelsForTags(tags, existingLabels = '') {
        let labels = existingLabels || '';
        
        if (!tags || !app_settings?.product_labels) return labels;

        // Track which tags we've already processed to avoid duplicates
        const processedTags = new Set();
        
        Object.keys(app_settings.product_labels).forEach((key) => {
            const l = app_settings.product_labels[key];
            const tags_to_process = l.tags.split(',');
            
            for(let tag_to_process of tags_to_process) {
                const normalizedTag = this.normalizeTag(tag_to_process);
                
                // Check if this tag matches and we haven't processed it yet
                if (tags.includes(normalizedTag) && !processedTags.has(normalizedTag)) {
                    // Check if this specific label tag is already in the labels HTML
                    if (!labels.includes('product-label-' + normalizedTag)) {
                        labels += this.generateLabelHTML(l, normalizedTag);
                        processedTags.add(normalizedTag);
                    }
                }
            }
        });

        return labels;
    }

    setProductBlockLabels() {
        this.body.find('product-block').each((index, element) => {
            const $block = $(element);
            const tags = $block.attr('data-tags');
            
            // Skip if in cross-sell carousel (based on original logic)
            if ($block.closest('#product-crosssell-carousel').length) {
                return;
            }

            const $labelContainers = $block.find('.product-label-container');
            if ($labelContainers.length === 0) return;

            // Merge multiple containers if they exist
            const $mainContainer = this.mergeLabelContainers($labelContainers);
            
            // Get existing labels from the container
            const existingLabels = $mainContainer.html();
            
            // Generate new labels (this function now properly checks for duplicates)
            const labels = this.getLabelsForTags(tags, existingLabels);
            
            // Update container if we have labels
            if (labels && labels !== existingLabels) {
                $mainContainer.html(labels);
            }
        });
    }

    setProductPageLabels() {
        const $productForm = this.body.find('product-form');
        const tags = $productForm.data('tags');
        
        if (!tags) return;

        const $variantContent = this.body.find('.main-image').find('variant-content');
        
        // Ensure label container exists
        let $labelContainer = $variantContent.find('.product-label-container');
        if ($labelContainer.length === 0) {
            $labelContainer = $('<div class="product-label-container"></div>');
            $variantContent.append($labelContainer);
        }

        // Merge multiple containers if they exist
        const $mainContainer = this.mergeLabelContainers($labelContainer);
        
        // Get existing labels from the container
        const existingLabels = $mainContainer.html();
        
        // Generate and append labels
        const labels = this.getLabelsForTags(tags, existingLabels);
        if (labels && labels !== existingLabels) {
            $mainContainer.html(labels);
        }
    }
}

// Initialize when DOM is ready
$(document).ready(() => {
    window.productLabelManager = new ProductLabelManager();
    
    // Export the functions for global access if needed
    window.setProductBlockLabels = () => productLabelManager.setProductBlockLabels();
    window.setProductPageLabels = () => productLabelManager.setProductPageLabels();
});