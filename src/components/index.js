//===================== Components =====================

import AppLoader from "./AppLoader.vue"
import AppNavbar from "./AppNavbar"
import AppModal from "./global/AppModal"

export { AppLoader, AppNavbar, AppModal }

// ======================== UI =========================

import VButton from "./UI/VButton"
import VListItem from "./UI/VListItem"
import VChart from "./UI/VChart"
import VInput from "./UI/VInput"
import VSelect from "./UI/VSelect"
import VTextarea from "./UI/VTextarea"

export { VButton, VInput, VListItem, VTextarea, VChart, VSelect }

// ====================== ADMIN ========================

import AdminAside from "./pages/Admin/AdminAside"

import AdminHeader from "./pages/Admin/AdminHeader"
import AdminNotificationMenu from "./pages/Admin/AdminNotificationMenu"
import AdminSidebarItem from "./pages/Admin/AdminSidebarItem"

import adminCreateRecipe from "./pages/Admin/AdminCreateRecipe"
import AdminTask from "./pages/Admin/AdminTask"
import AdminTaskList from "./pages/Admin/AdminTaskList"
import AdminWrapper from "./pages/Admin/AdminWrapper"
import AdminBlock from "./pages/Admin/AdminBlock"

export {
    AdminAside,
    AdminHeader,
    AdminNotificationMenu,
    AdminSidebarItem,
    adminCreateRecipe,
    AdminTask,
    AdminTaskList,
    AdminWrapper,
    AdminBlock,
}

// ====================== Export ========================
