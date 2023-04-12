import { TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

export const TinyMCEProvider = [
  {
    provide: TINYMCE_SCRIPT_SRC,
    useValue: 'tinymce/tinymce.min.js',
    multi: true,
  },
];
