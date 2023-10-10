import {required} from "vuelidate/lib/validators";
import momentTz from "moment-timezone";
import moment from "moment";

export const convertHexToRGBA = (hexCode, opacity) => {
    let hex = hexCode.replace('#', '');

    if (hex.length === 3) {
        hex += hex;
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r},${g},${b},${opacity / 100})`;
};

export const svgIconClose = `<span><svg class="icon " width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.3 5.70996C18.1131 5.5227 17.8595 5.41747 17.595 5.41747C17.3305 5.41747 17.0768 5.5227 16.89 5.70996L12 10.59L7.10997 5.69996C6.92314 5.5127 6.66949 5.40747 6.40497 5.40747C6.14045 5.40747 5.8868 5.5127 5.69997 5.69996C5.30997 6.08996 5.30997 6.71996 5.69997 7.10996L10.59 12L5.69997 16.89C5.30997 17.28 5.30997 17.91 5.69997 18.3C6.08997 18.69 6.71997 18.69 7.10997 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.10996C18.68 6.72996 18.68 6.08996 18.3 5.70996Z" fill="#BDBDBD"></path></svg></span>`;

export const uniqueId = () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

export const humanFileSize = (bytes, si = false, dp = 1) => {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let u = -1;
    const r = 10**dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


    return bytes.toFixed(dp) + ' ' + units[u];
};

export const listLanguages = [
    {
        value: 'en',
        text: 'English'
    },
    {
        value: 'vn',
        text: 'Vietnamese'
    },
    {
        value: 'es',
        text: 'Spanish'
    },
    {
        value: 'tr',
        text: 'Turkish'
    },
    {
        value: 'th',
        text: 'Thai'
    },
    {
        value: 'kh',
        text: 'Khmer'
    }
];

export const CODE_FAILED = 400;
export const CODE_SUCCESS = 200;
export const CODE_VALIDATE_FAILED = 422;
export const CODE_SERVER_ERROR = 500;
export const CODE_AUTH_ERROR = 401;

export const handleRequestError = (error) => {
  const statusCode = error.response.status;
  if (statusCode === CODE_VALIDATE_FAILED) {
    return error.response.data.errors;
  } else {
    return {
      message: error.response.data.message
    }
  }
}

export const MCQ = 1;
export const OED = 2;
export const OLYMPIC_PUBLIC = 1;
export const OLYMPIC_PRIVATE = 2;

export const displayOlympicQuestionType = (type) => {
  if (type === MCQ) {
    return 'Trắc nghiệm';
  }
  return 'Tự luận';
}

export const snackbarDefaultConfig = () => {
    return {
        text: '',
        color: 'dark',
        timeout: 3500,
    };
}

export const getUuid = (slug) => {
  return slug.substr(slug.length - 8);
}

export const inputRequiredErrors = (title, error, msg) => {
  const errors = []
  if (!title.$dirty) return errors
  !title.required && errors.push(msg);
  if (error) errors.push(error);
  return errors
}

export const inputMinLengthErrors = (title, error, msg) => {
  const errors = []
  if (!title.$dirty) return errors
  !title.minLength && errors.push(msg);
  if (error) errors.push(error);
  return errors
}

export const inputEmailErrors = (title, error) => {
  const errors = []
  if (!title.$dirty) return errors
  !title.email && errors.push('Email không hợp lệ.');
  if (error) errors.push(error);
  return errors
}

export const displayDuration = (seconds) => {
  const timeMinutes = Math.floor(seconds / 60);
  const timeSeconds = seconds % 60;
  return timeMinutes ? `${timeMinutes} phút` : timeSeconds ? `${timeSeconds} giây` : '';
}

export const loadJsMathjax = () => {
  const jsMathjax = document.getElementById('js-mathjax');
  if (!jsMathjax) {
    const plugin = document.createElement('script');
    plugin.setAttribute(
      'src',
      'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS_CHTML'
    );
    plugin.setAttribute('id', 'js-mathjax');
    plugin.async = true;
    plugin.onload = () => {
      MathJax.Hub.Config({
        tex2jax: {
          inlineMath: [['$','$'],['\\(','\\)']]
        }
      });
    };
    document.head.appendChild(plugin);
  }
}

export const reRenderJsMathjax = () => {
  if(window.MathJax) {
    window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
  }
}

export const isVideoType = (link) => {
  const videoTypes = [".264", ".3g2", ".3gp", ".3gp2", ".3gpp", ".3gpp2", ".3mm", ".3p2", ".60d", ".787", ".890", ".aaf", ".aec", ".aecap", ".aegraphic", ".aep", ".aepx", ".aet", ".aetx", ".ajp", ".ale", ".am", ".amc", ".amv", ".amv", ".amx", ".anim", ".anx", ".aqt", ".arcut", ".arf", ".asf", ".asx", ".av", ".av3", ".avb", ".avc", ".avchd", ".avd", ".ave", ".avi", ".avm", ".avp", ".avr", ".avs", ".avv", ".awlive", ".axm", ".axv", ".bdm", ".bdmv", ".bdt2", ".bdt3", ".bik", ".bik2", ".bin", ".bix", ".bk2", ".blz", ".bmc", ".bmk", ".bnp", ".box", ".bs4", ".bsf", ".bu", ".bvr", ".byu", ".camproj", ".camrec", ".camv", ".ced", ".cel", ".cine", ".cip", ".clk", ".clpi", ".cme", ".cmmp", ".cmmtpl", ".cmproj", ".cmrec", ".cmv", ".cpi", ".cpvc", ".crec", ".cst", ".cvc", ".cx3", ".d2v", ".d3v", ".dad", ".dash", ".dat", ".dav", ".db2", ".dce", ".dck", ".dcr", ".dcr", ".ddat", ".dif", ".dir", ".divx", ".dlx", ".dmb", ".dmsd", ".dmsd3d", ".dmsm", ".dmsm3d", ".dmss", ".dmx", ".dnc", ".dpa", ".dpg", ".drc", ".dream", ".dsy", ".dv", ".dv4", ".dvdmedia", ".dvr", ".dvx", ".dxr", ".dzm", ".dzp", ".dzt", ".edl", ".evo", ".exo", ".exp", ".eye", ".eyetv", ".ezt", ".f4a", ".f4b", ".f4f", ".f4m", ".f4p", ".f4v", ".fbr", ".fbz", ".fcarch", ".fcp", ".fcproject", ".ffd", ".ffm", ".flc", ".flh", ".fli", ".flic", ".flv", ".flx", ".fpdx", ".ftc", ".fvt", ".g2m", ".g64", ".g64x", ".gcs", ".gfp", ".gifv", ".gl", ".gom", ".grasp", ".gts", ".gvi", ".gvp", ".gxf", ".h264", ".hdmov", ".hdv", ".hevc", ".hkm", ".ifo", ".imovielibrary", ".imoviemobile", ".imovieproj", ".imovieproject", ".infovid", ".infovid", ".inp", ".insv", ".int", ".ircp", ".irf", ".ism", ".ismc", ".ismclip", ".ismv", ".iva", ".ivf", ".ivr", ".ivs", ".izz", ".izzy", ".jdr", ".jmv", ".jnr", ".jss", ".jts", ".jtv", ".k3g", ".kdenlive", ".kmv", ".ktn", ".lrec", ".lrv", ".lsf", ".lsx", ".lvix", ".m15", ".m1pg", ".m1v", ".m21", ".m2a", ".m2p", ".m2t", ".m2ts", ".m2v", ".m4e", ".m4p", ".m4u", ".m4v", ".m75", ".mani", ".meta", ".mgv", ".mj2", ".mjp", ".mjpeg", ".mjpg", ".mk3d", ".mkv", ".mmv", ".mng", ".mnv", ".mob", ".mod", ".modd", ".moff", ".moi", ".moov", ".mov", ".movie", ".mp21", ".mp2v", ".mp4", ".mp4v", ".mpe", ".mpeg", ".mpeg1", ".mpeg2", ".mpeg4", ".mpf", ".mpg", ".mpg2", ".mpg4", ".mpgindex", ".mpl", ".mpls", ".mproj", ".mpsub", ".mpv", ".mpv2", ".mqv", ".msdvd", ".mse", ".msh", ".mswmm", ".mt2s", ".mts", ".mtv", ".mvb", ".mvc", ".mvd", ".mve", ".mvex", ".mvp", ".mvy", ".mxf", ".mxv", ".mys", ".n3r", ".ncor", ".nfv", ".nsv", ".ntp", ".nuv", ".nvc", ".ogg", ".ogm", ".ogv", ".ogv", ".ogx", ".orv", ".osp", ".otrkey", ".pac", ".par", ".pds", ".pgi", ".photoshow", ".piv", ".pjs", ".playlist", ".plproj", ".pmf", ".pmv", ".pns", ".ppj", ".prel", ".pro", ".pro4dvd", ".pro5dvd", ".proqc", ".prproj", ".prtl", ".psb", ".psh", ".pssd", ".psv", ".pva", ".pvr", ".pxv", ".pz", ".qsv", ".qt", ".qtch", ".qtindex", ".qtl", ".qtm", ".qtz", ".r3d", ".ravi", ".rcd", ".rcproject", ".rcrec", ".rcut", ".rdb", ".rec", ".rm", ".rmd", ".rmp", ".rms", ".rmv", ".rmvb", ".roq", ".rp", ".rsx", ".rts", ".rum", ".rv", ".rvid", ".rvl", ".san", ".sbk", ".sbt", ".sbz", ".scc", ".scm", ".scn", ".screenflow", ".sdv", ".sec", ".sedprj", ".seq", ".ser", ".sfd", ".sfera", ".sfvidcap", ".siv", ".smi", ".smil", ".smk", ".sml", ".smv", ".snagproj", ".spl", ".sqz", ".srt", ".ssf", ".ssm", ".stl", ".str", ".stx", ".svi", ".swf", ".swi", ".swt", ".tda3mt", ".tdt", ".tdx", ".theater", ".thp", ".tid", ".tivo", ".tix", ".tod", ".tp", ".tp0", ".tpd", ".tpr", ".trec", ".trp", ".ts", ".tsp", ".tsv", ".ttxt", ".tvlayer", ".tvrecording", ".tvs", ".tvshow", ".usf", ".usm", ".v264", ".vbc", ".vc1", ".vcpf", ".vcr", ".vcv", ".vdo", ".vdr", ".vdx", ".veg", ".vem", ".vep", ".vf", ".vft", ".vfw", ".vfz", ".vgz", ".vid", ".video", ".viewlet", ".viv", ".vivo", ".vix", ".vlab", ".vmlf", ".vmlt", ".vob", ".vp3", ".vp6", ".vp7", ".vpj", ".vr", ".vro", ".vs4", ".vse", ".vsh", ".vsp", ".vtt", ".w32", ".wcp", ".webm", ".wfsp", ".wgi", ".wlmp", ".wm", ".wmd", ".wmmp", ".wmv", ".wmx", ".wot", ".wp3", ".wpl", ".wsve", ".wtv", ".wvm", ".wvx", ".wxp", ".xej", ".xel", ".xesc", ".xfl", ".xlmv", ".xml", ".xmv", ".xvid", ".y4m", ".yog", ".yuv", ".zeg", ".zm1", ".zm2", ".zm3", ".zmv"
  ];
  const videoExt = link.replace(/^.+(?=\.)/i, '');

  return (videoTypes.indexOf(videoExt.toLowerCase()) > -1);
}

export const STUDENT_NOT_JOIN = 0;
export const STUDENT_ON_GOING = 1;
export const STUDENT_FINISHED = 2;

export const timezones = () => {
  function displayTz(tz) {
    return '(UTC' + moment.tz(tz).format('Z') + ') ' + tz.replaceAll("/", ", ").replaceAll("_", " ");
  }
  return momentTz.tz.names().filter(tz => {
    return !tz.includes('Etc/GMT');
  }).map(tz => {
    return {
      value: tz,
      display: displayTz(tz)
    };
  });
}

export const TITLE_TEMPLATE = '%s | Olymtest.com';
