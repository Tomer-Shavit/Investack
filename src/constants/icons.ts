import { BsFillGearFill } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import {
  FaBell,
  FaCaretDown,
  FaCaretUp,
  FaEdit,
  FaHistory,
  FaHome,
  FaLock,
  FaPlus,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { HiChartPie, HiTrendingUp } from "react-icons/hi";
import { SiBitcoin } from "react-icons/si";

export const ICONS_TO_CLASSES = {
  portfolio: HiChartPie,
  stocks: HiTrendingUp,
  crypto: SiBitcoin,
  history: FaHistory,
  account: FaUser,
  settings: BsFillGearFill,
  notes: CgNotes,
  news: FaBell,
  down: FaCaretDown,
  up: FaCaretUp,
  home: FaHome,
  locked: FaLock,
  plus: FaPlus,
  x: FaTimes,
  edit: FaEdit,
  caretUp: FaCaretUp,
  caretDown: FaCaretDown,
};
