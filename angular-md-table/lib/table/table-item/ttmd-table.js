class TtmdTableController {
    /*@ngInject*/
    constructor(PaginationModel, ttMdTable, $transclude, $log, $parse) {

        this.$transclude = $transclude;
        this.isDetailShown = false;
        this.$log = $log;
        this.$parse = $parse;
        this.ttMdTable = ttMdTable;

        const pagination = {
            listType: this.type,
            offset: 1,
            limits: this.limits,
            total: this.totalNumber,
            breakpoint: this.breakpoint,
            forceMobile: this.forceMobile
        };
        this.model = new PaginationModel(pagination);
    }

    /**
     * Check whether component has transclude item passed in
     * @param type
     */
    hasTransclude(type) {
        return this.$transclude.isSlotFilled(type);
    }

    /**
     * For limitTo fileter
     * @returns {number}
     */
    getLimitTo() {

        if (!this.totalNumber) {
            return _.size(this.items)
        }

        return this.model.getLimit();
    }

    /**
     * For orderBy filter
     * @returns {*}
     */
    getOrderBy() {
        if (this.sort) {
            return _.first(this.sort);
        } else {
            return '';
        }
    }

    /**
     * Detect whether should switch to mobile view
     */
    goMobile() {
        return this.model.goMobile();
    }

    /**
     * When pagination is clicked, return the pagination model with callback
     * @param paginationModel
     */
    updateList(paginationModel) {
        const {listType} = paginationModel,
            offset = paginationModel.getOffset(),
            limit = paginationModel.getLimit(),
            obj = {
                limit,
                offset,
                listType
            };

        this.onPageChange({payload: obj});
    }

    /**
     * Show the detail view
     * @param item
     * @param ev
     */
    showDetail(item, ev) {
        ev.stopPropagation();
        if (!this.hasTransclude('details')) {
            this.$log.debug('ttmd-table component: ttmd-detail tag is not defined in your html');
            return;
        }

        this.onRowClick({payload: item});
        this.toggleDetail();
    }

    /**
     * Format the field
     * @returns {*}
     */
    getPipes(){
        if(this.pipes){
            return this.pipes;
        }else{
            return [];
        }
    }

    /**
     * Detect whether should show the detail view
     * @param b
     */
    toggleDetail(b) {
        if (b) {
            this.isDetailShown = b;
        } else {
            this.isDetailShown = !this.isDetailShown;
        }
    }

    /**
     * Detect whether the table row should be highlighted
     * @param item
     * @returns {*}
     */
    shouldHighlightRow(item) {
        if (this.highlightRow) {
            return this.highlightRow(item);
        } else {
            return false;
        }
    }

    /**
     * Get message if there is no data
     * @param type
     * @returns {string|*}
     */
    getDefaultMessage(type){
        return this.noDataText || this.ttMdTable.getMessage(type);
    }

    /**
     * Whether should show pagiantion
     * @returns {boolean|*}
     */
    shouldShowPagination(){
        if(this.items !== undefined){
            return this.items.length !== 0 && this.totalNumber;
        }else{
            return false;
        }
    }

    //TODO: refactor accodrion to a own directive
    /**
     * Control whether should show accordion
     */
    shouldShownAccordion(){

        if(this.enableAccordion === false){
           this.accordionState = true;
        }

        return this.enableAccordion !== undefined ?
            this.enableAccordion:
            this.ttMdTable.getEnableAccordion();
    }

    toggleAccordionState(){
        if(this.shouldShownAccordion()){
            this.accordionState = !this.accordionState;
        }
    }
}


const ttmdTableComponent = {
    bindings: {
        toolbar: '<',                   //Show the toolbar
        headers: '<',                   //Show the table header
        forceMobile: '<',               //Show mobile view always
        limits: '<',                    //Limits item pre page {desktop: 8, mobile: 3}
        sort: '<',                      //Sort according to attr ['dueDate']
        exclude: '<',                   //Exclude attr from displaying ['id']
        items: '<',                     //Items to be displayed
        totalNumber: '<',               //Enable pagination, the total number of items
        accordionState: '<',            //Set enable accordion to 'true' or 'false'
        enableAccordion: '<',           //Set accordion state to 'true' or 'false'
        highlightRow: '<',              //Function, highlight the row
        pipes: '<',                     //For the format style [{currency: 'amount', symbol: '$'}]
        type: '@',                      //Table name, use for update table efficiently
        breakpoint: '@',                //Define the breakpoint for mobile view
        noDataText: '@',                //When there is no data, show this text
        onPageChange: '&',              //Callback, change the page number and fire callback
        onRowClick: '&'                 //Callback, show the detail view when click the row
    },
    transclude: {
        'actions': '?ttmdActions',      //Show the action column
        'details': '?ttmdDetail'        //Show the detial veiw
    },
    controller: TtmdTableController,
    controllerAs: 'vm',
    template: require('./ttmd-table.html')
};

export default (ngModule) => {
    ngModule.component('ttmdTable', ttmdTableComponent);
}
