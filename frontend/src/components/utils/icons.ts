import { FaFilter, FaHome, FaFileAlt } from "react-icons/fa";
import { RiAccountCircleFill, RiQuestionAnswerFill } from "react-icons/ri";
import { FaRankingStar } from "react-icons/fa6";
import { IoMdSettings} from "react-icons/io";
import { MdLiveHelp }  from "react-icons/md";
import { BiLogIn } from "react-icons/bi";
import { GrCheckboxSelected } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

const icons = {
    Filter: FaFilter,
    Ranking: FaRankingStar,
    Help: MdLiveHelp,
    Settings: IoMdSettings,
    Profile: RiAccountCircleFill,
    Login: BiLogIn,
    Essay: FaFileAlt,
    Question: RiQuestionAnswerFill,
    Home: FaHome,
    Checkbox: GrCheckboxSelected,
    Checked: FaCheck,
    DoubleArrowRight: MdKeyboardDoubleArrowRight,
    DoubleArrowLeft: MdKeyboardDoubleArrowLeft,
};

export default icons;