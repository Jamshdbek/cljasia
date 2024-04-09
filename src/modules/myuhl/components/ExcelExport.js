import { BaseButton } from "components";
import * as FileSaver from "file-saver";
import { forEach, get, isBuffer } from "lodash";
import XLSX from "sheetjs-style";
const ExcelJS = require("exceljs");

const ExcelExport = ({
    excelData,
    fileName,
    toCompany,
    fromCompany,
    reysNumber,
    isCheckedParcels,
    ...props
}) => {
    const { columns, rows } = excelData;
    const exportTOExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet(fileName);
        // sheet.properties.defaultRowHeight = 80;

        sheet.mergeCells("A3", "E3");

        const rowCompany = sheet.getRow(3);
        rowCompany.height = 50;
        rowCompany.alignment = { vertical: "middle", horizontal: "center" };

        // names of companies
        sheet.getCell("A3").value = `Courier company's name and address 
         ${get(toCompany, "name", "")} ${get(toCompany, "address", "")}`;

        sheet.mergeCells("F3", "I3");
        sheet.getCell("F3").value = `Courier company's name and address 
        ${get(fromCompany, "name", "")} ${get(fromCompany, "address", "")}`;

        // main title
        const rowMainTitle = sheet.getRow(5);
        rowMainTitle.alignment = { vertical: "middle", horizontal: "center" };
        sheet.mergeCells("A5", "I5");
        sheet.getCell(
            "A5"
        ).value = `Name of documents in cargo manifest/ Перечень сведений, указываемых в манифесте`;

        // title with reys number
        const rowSubTitle = sheet.getRow(7);
        rowSubTitle.alignment = { vertical: "middle", horizontal: "center" };
        sheet.mergeCells("A7", "I7");
        sheet.getCell(
            "A7"
        ).value = `Waybill name/ Номер транспортной накладной-${reysNumber}`;

        const headerValues = columns.map((item) => item.header);
        const headerKeys = columns.map(({ header, key, ...props }) => ({
            key: key,
            ...props,
        }));

        sheet.getRow(9).values = headerValues;

        // headers
        sheet.columns = headerKeys;

        const headerRow = sheet.getRow(9);
        headerRow.height = 35;
        headerRow.alignment = { vertical: "middle", horizontal: "center" };

        // value of each header
        rows?.map((elm, index) => {
            sheet.addRow({
                order: get(elm, "code", "") != "Total" ? index + 1 : "",
                invoiceNumber: get(elm, "code", ""),
                receiverName: get(elm, "receiver", ""),
                pinfl: get(elm, "pinfl", ""),
                passportNumber: get(elm, "passport", ""),
                grossWeight: get(elm, "weight", "") / 1000,
                totalPrice: get(elm, "totalProductPrice", ""),
                items: get(elm, "allProductName", ""),
                address: get(elm, "address", ""),
            });
        });

        // empty row
        sheet.addRow({});
        sheet.addRow({});
        sheet.addRow({});

        sheet.addRow({
            invoiceNumber: " SIGNATURE AND STAMP/ПОДПИСЬ И ПЕЧАТЬ",
        });
        sheet.addRow({
            invoiceNumber:
                " Description/Примечание: __________________________________________",
        });

        const cells = [];

        sheet.eachRow((row, index) => {
            row.eachCell((cell) => {
                cells.push(cell["_address"]);
            });
        });

        const lastCells = cells.slice(cells.length - 2, cells.length);
        const fontSize = 14; // Change this to the desired font size

        sheet.eachRow((row, index) => {
            row.eachCell((cell) => {
                cell.font = { size: fontSize };
                if (!lastCells.includes(cell["_address"])) {
                    cell.alignment = {
                        vertical: "middle",
                        horizontal: "center",
                        wrapText: true,
                    };
                }
            });
        });

        const fontBoldCells = [
            "A5",
            "A7",
            "A9",
            "B9",
            "C9",
            "D9",
            "E9",
            "F9",
            "G9",
            "H9",
            "I9",
            "B35",
            "F35",
            "G35",
        ];

        fontBoldCells.forEach(
            (item) =>
                (sheet.getCell(item).font = {
                    size: fontSize,
                    bold: true,
                })
        );

        workbook.xlsx.writeBuffer().then((data) => {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = `${fileName}.xlsx`;
            anchor.click();
            window.URL.revokeObjectURL(url);
        });
    };

    return (
        <BaseButton
            {...props}
            handleClick={(e) => exportTOExcel(fileName)}
            bordered
            disabled={!isCheckedParcels}
            style={
                !isCheckedParcels
                    ? {
                          color: "#B3B3B3",
                          border: "solid 2px #B3B3B3",
                      }
                    : {}
            }
        />
    );
};

export default ExcelExport;
