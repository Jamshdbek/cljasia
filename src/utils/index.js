import { get, includes, flatten } from "lodash";
import _ from "lodash";
import moment from "moment";
import { Text } from "components";

const hasAccess = (items = [], can = "") => {
    let access = false;
    can = can.split(" ");
    items = items.map(({ name }) => name);
    can.map((item) => {
        if (includes(items, item)) {
            access = true;
        }
    });
    return access;
};

const getDepartmentsList = (
    departments = [],
    selectedDepartments = [],
    selectedPages = []
) => {
    const departmentsList =
        departments
            .filter((department) =>
                includes(selectedDepartments, get(department, "name", null))
            )
            .map((department) => ({
                ...department,
                pages: get(department, "pages")
                    .filter((page) =>
                        includes(selectedPages, get(page, "name"))
                    )
                    .map((page) => ({ ...page, checked: true })),
            })) || [];
    return departmentsList;
};

const getPermissionsList = (permissions = [], selectedPermissions = []) => {
    const permissionsList =
        permissions
            .filter((permission) =>
                includes(selectedPermissions, get(permission, "name", null))
            )
            .map((permission) => ({ ...permission, checked: true })) || [];
    return permissionsList;
};

const getPagesId = (departments = [], selectedPages = []) => {
    const pagesIdList =
        flatten(
            departments.map((department) => flatten(get(department, "pages")))
        )
            .filter((page) => includes(selectedPages, get(page, "name")))
            .map((page) => get(page, "id", null)) || [];
    return pagesIdList;
};
const saveFile = (file, name = moment(), extension = "xlsx") => {
    const blob = new Blob([file.data]);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${name}.${extension}`;
    link.click();
    URL.revokeObjectURL(link.href);
};

const dateFormat = (date = null, isExl = false) => {
    moment.locale("ru");
    const currentDate = moment(date).format("YYYY.MM.DD HH:mm");
    if (isExl) {
        const exl = `${moment
            .utc(currentDate, "YYYY.MM.DD HH:mm")
            .local()
            .format("YYYY.MM.DD")} ${moment
            .utc(currentDate, "YYYY.MM.DD HH:mm")
            .local()
            .format("HH:mm")}`;
        return exl;
    }
    if (date) {
        return (
            <>
                <Text xs dark>
                    {moment
                        .utc(currentDate, "YYYY.MM.DD HH:mm")
                        .local()
                        .format("YYYY.MM.DD")}
                </Text>
                <br />
                <Text xxs gray>
                    {moment
                        .utc(currentDate, "YYYY.MM.DD HH:mm")
                        .local()
                        .format("HH:mm")}
                </Text>
            </>
        );
    }

    return;
};

const dateFormatDefault = (date = null,size1, isExl = false) => {
    moment.locale("ru");
    const currentDate = moment(date).format("YYYY.MM.DD HH:mm");
    if (isExl) {
        const exl = `${moment
            .utc(currentDate, "YYYY.MM.DD HH:mm")
            .local()
            .format("YYYY.MM.DD")} ${moment
            .utc(currentDate, "YYYY.MM.DD HH:mm")
            .local()
            .format("HH:mm")}`;
        return exl;
    }
    if (date) {
        return (
            <>
                <Text size1 dark>
                    {moment
                        .utc(currentDate, "YYYY.MM.DD HH:mm")
                        .local()
                        .format("YYYY/MM/DD")}
                              {" "} {moment
                        .utc(currentDate, "YYYY.MM.DD HH:mm")
                        .local()
                        .format("HH:mm")}
                </Text>
            </>
        );
    }

    return;
};

const commonDate = ({
    date,
    formatDate = "MMMM DD, YYYY",
    commonFormatDate = "MMMM DD, YYYY HH:mm",
}) => {
    moment.locale("ru", {
        months: "Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь".split(
            "_"
        ),
    });
    const currentDate = moment(date).format(commonFormatDate);
    return (
        <>
            <Text xs dark>
                {moment
                    .utc(currentDate, commonFormatDate)
                    .local()
                    .format(formatDate)}
            </Text>
            <br />
            <Text xxs gray className={"mt-4"}>
                {moment
                    .utc(currentDate, commonFormatDate)
                    .local()
                    .format("HH:mm")}
            </Text>
        </>
    );
};
// const myEmsDate = ({
//     date,
//     formatDate = "MMMM DD, YYYY",
//     commonFormatDate = "MMMM DD, YYYY HH:mm",
// }) => {
//     const currentDate = moment(date).utcOffset(date).format(commonFormatDate);
//     return (
//         <>
//             <Text xs dark>
//                 {moment
//                     .utc(currentDate, commonFormatDate)
//                     .local()
//                     .format(formatDate)}
//             </Text>
//             <br />
//             <Text xxs gray className={"mt-4"}>
//                 {moment
//                     .utc(currentDate, commonFormatDate)
//                     .local()
//                     .format("HH:mm")}
//             </Text>
//         </>
//     );
// };
const myEmsDate = (date = null, ) => {

    if (date) {
        return (
            <>
                <Text xs dark>
                    {moment(date).utcOffset(date).format("YYYY.MM.DD")}
                </Text>
                <br />
                <Text xxs gray>
                    {moment(date).utcOffset(date).format("HH:mm")}
                </Text>
            </>
        );
    }

    return;
};

const checkToNumber = (event) => {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
    }
};



export {
    hasAccess,
    getDepartmentsList,
    getPermissionsList,
    getPagesId,
    saveFile,
    dateFormat,
    checkToNumber,
    commonDate,
    myEmsDate,
    dateFormatDefault
};
