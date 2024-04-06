import { createGlobalStyle } from "styled-components";
// import "react-confirm-alert/src/react-confirm-alert.css";

export default createGlobalStyle`
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

h1, h2, h3, h4, h5, h6, p, ul {
  margin: 0;
  padding: 0;
}

body {
  font-weight: 400;
  font-size: 16px;
  color: #585757;
  background: #F7F7F7;
  line-height: 1.25;
  font-family: 'Inter', sans-serif;
}

.card{
  width: 100%;
  border: 1px solid black;
  border-radius: 20px;
  height: 100px;
}

.download-table-xls-button {
  padding: 8px 12px;
    cursor: pointer;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 2px 1px rgba(0, 0, 0, 0.06),
        0px 1px 1px rgba(0, 0, 0, 0.08);
    font-size: ${({ fontSize }) => fontSize || "16px"};
    min-width: ${({ width }) => width || "100px"};
    border-radius: 8px;
    color: #B3B3B3;
  border: solid 2px #B3B3B3;
  outline: none;
  background-color: #fff;
 
}
.requerd-wrap{
  position: relative;
  flex-basis: '20%';
}
.active-download-table-xls-button {
  padding: 8px 12px;
    cursor: pointer;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 2px 1px rgba(0, 0, 0, 0.06),
        0px 1px 1px rgba(0, 0, 0, 0.08);
    font-size: ${({ fontSize }) => fontSize || "16px"};
    min-width: ${({ width }) => width || "100px"};
    border-radius: 8px;
    color: #B3B3B3;
  border: solid 1px #0085ff;
            color: #0085ff;
            background-color: #ffffff;
}

.pagination{
    display: flex;
    justify-content: flex-end;
    list-style: none;
    li{
        margin-right: 8px;
        cursor: pointer;
        &:last-child{
            margin-right: 0;
        }
        a{
            text-decoration: none;
            padding: 8px 12px;
            background-color: #fff;
            border: 1px solid #E8E8E8;
            color: #1C1C1C;
            border-radius: 8px;
        }
        &.active{
          a{
              background-color: #0085FF;
              border-color: #0085FF;
              color: #fff;
              box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 2px 1px rgba(0, 0, 0, 0.06), 0px 1px 1px rgba(0, 0, 0, 0.08);
          }
        }
        &.disabled{
            a {
                color: #969696;
                cursor: not-allowed;
            }
        }
    }
}


.p-30{
  padding: 5px 15px !important;
}

.mb-2 {
  margin-bottom: 2px !important;
}

.mb-8 {
  margin-bottom: 8px !important;
}

.mb-16 {
  margin-bottom: 16px !important;
}

.mr-2 {
  margin-right: 2px !important;
}

.mr-4 {
  margin-right: 4px !important;
}

.mr-8 {
  margin-right: 8px !important;
}

.mr-16 {
  margin-right: 16px !important;
}

.mr-32 {
  margin-right: 32px !important;
}

.mr-64 {
  margin-right: 64px !important;
}

.mr-128 {
  margin-right: 128px !important;
}

.mr-256 {
  margin-right: 256px !important;
}

.ml-2 {
  margin-left: 2px !important;
}

.ml-4 {
  margin-left: 4px !important;
}

.ml-8 {
  margin-left: 8px !important;
}

.ml-16 {
  margin-left: 16px !important;
}

.ml-32 {
  margin-left: 32px !important;
}

.ml-64 {
  margin-left: 64px !important;
}

.mr-16 {
  margin-right: 16px !important;
}

.mb-16 {
  margin-bottom: 16px !important;
}

.mb-24 {
  margin-bottom: 24px !important;
}

.mb-32 {
  margin-bottom: 32px !important;
}

.mb-48 {
  margin-bottom: 48px !important;
}

.mb-4 {
  margin-bottom: 4px !important;
}

.mb-64 {
  margin-bottom: 64px !important;
}

.mb-256 {
  margin-bottom: 256px !important;
}

.mb-128 {
  margin-bottom: 128px !important;
}

.mt-2 {
  margin-top: 2px !important;
}

.mt-4 {
  margin-top: 4px !important;
}


.mt-128 {
  margin-top: 128px !important;
}

.mt-64 {
  margin-top: 64px !important;
}

.mt-48 {
  margin-top: 48px !important;
}

.mt-32 {
  margin-top: 32px !important;
}

.mt-24 {
  margin-top: 24px !important;
}
.mt-16{
  margin-top: 16px !important;
}

.mt-8 {
  margin-top: 8px !important;
}

.ml-8 {
  margin-left: 8px !important;
}

.ml-16 {
  margin-left: 16px !important;
}

.ml-24 {
  margin-left: 24px !important;
}

.ml-32 {
  margin-left: 32px !important;
}

.mr-8 {
  margin-right: 8px !important;
}

.mr-16 {
  margin-right: 16px !important;
}

.mr-24 {
  margin-right: 24px !important;
}

.mr-32 {
  margin-right: 32px !important;
}

.p-4 {
  padding: 4px !important;
}

.p-8 {
  padding: 8px !important;
}

.p-16 {
  padding: 16px !important;
}

.p-32 {
  padding: 32px !important;
}

.pl-8 {
  padding-left: 8px !important;
}

.pl-16 {
  padding-left: 16px !important;
}

.pl-24 {
  padding-left: 24px !important;
}

.pl-32 {
  padding-left: 32px !important;
}

.pr-8 {
  padding-right: 8px !important;
}

.pr-16 {
  padding-right: 16px !important;
}

.pr-24 {
  padding-right: 24px !important;
}

.pr-32 {
  padding-right: 32px !important;
}

.pr-64 {
padding-right: 64px !important;
}

.pt-25 {
  padding-top: 25px !important;
}

.my-8 {
  margin-top: 8px !important;
  margin-bottom: 16px !important;
}

.my-16 {
  margin-top: 16px !important;
  margin-bottom: 32px !important;
}

.my-32 {
  margin-top: 32px !important;
  margin-bottom: 64px !important;
}


.display_flex_center {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.link_color {
  color: rgba(80, 138, 241, 1);
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
}

.link_color_black {
  color: #585757;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
}

.link_size-12 {
  font-size: 12px;
}

.link_size-16 {
  font-size: 16px;
}


.p-16 {
  padding: 16px !important;
}

.pb-32 {
  padding-bottom: 32px !important;
}

.p-50 {
  padding: 50px !important;
}
.mr-24{
  margin-right: 24px !important;
}

.mr-32{
  margin-right: 32px !important;
}

.text-center {
  text-align: center;
}

.ml-128 {
  margin-left: 128px !important;
}

.text-right {
  text-align: right;
}

.minWidth-tdPhone {
  min-width: 180px;
}

.visibility-hidden {
  visibility: hidden;
}

.cursor-pointer {
  cursor: pointer;
}

.list-style-type {
  list-style-type: none;
}

.react-datepicker{
  display: flex;
}
.base-input{
  box-shadow: 0px 1px 1px rgb(0 0 0 / 6%);
  border-radius: 8px;
  border: 1px solid #E8E8E8;
  padding: 8px 12px;
  outline: none;
  color: #1C1C1C;
  font-weight: 500;
  font-size: 16px;
  width: 100%;
}
.reset__link {
  color: #969696;
  font-size: 16px;
  text-decoration: none;
  transition: 0.3s ease;

  &:hover {
    text-decoration: underline;
    color: #0085FF;
  }
}
.d-none{
  display: none;
}
.img-fluid{
  max-width: 100%;
  height: auto;
}
.pg-detail hr{
  border-bottom: 1px solid #E8E8E8 !important;
}

.editorClassName {
  width: 100%;
  height: 614px;
  border: 1px solid #E8E8E8;
}


hr {
  border: 0.5px solid #E8E8E8 !important;
}

@media print
{
  .no-print, .no-print *
  {
    display: none !important;
  }
  .print{
    width: 1800px !important;
    background-color:red;
    max-width: unset !important;
    flex: 0 0 100% !important;
  }
  .pg-detail{
    box-shadow: unset;
  }
}

.primary {
  color: #2050F5
}

.danger {
  color: #D80027;
}

.border {
  border: 1px solid black;
}

.light-border {
  border: 1px solid #e8e8e8;
}

.pagination_position {
  position: absolute;
  bottom: 16px;
  width: 100%;
}

.mt-12 {
  margin-top: 12px !important;
}

.svg_icon {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    & > div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    /* & > div {
        svg {
            width: 19px;
            height: 19px;
        }
    } */
}

`;
