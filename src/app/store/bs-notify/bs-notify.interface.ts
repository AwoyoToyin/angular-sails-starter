export interface BsNotice {
    icon?: string;
    icon_type?: string; // class | image
    title?: string;
    type?: string;
    message: string;
    additional?: string;
    position?: string;
    url_target?: string;
    allow_dismiss?: boolean;
    showProgressbar?: boolean;
    placement?: string;
    delay?: number;
}
