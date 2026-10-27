import type { Config } from 'tailwindcss';
export default {
  content:['./src/**/*.{ts,tsx}'],
  theme:{extend:{
   colors:{
    paper:'#F2F1EC',ink:'#192126',muted:'#657077',sage:'#B88B2C',sand:'#D9B15B',line:'#DCE0DF',deep:'#192126',bone:'#E8E9E5'
   },
   fontFamily:{sans:['Arial','Helvetica Neue','sans-serif'],display:['Arial Narrow','Arial','Helvetica Neue','sans-serif']},
   boxShadow:{floating:'0 24px 60px rgba(20,25,30,.14)'}
  }},plugins:[]
} satisfies Config;
