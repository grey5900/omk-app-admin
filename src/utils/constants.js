/**
 * Created by yons on 16/4/8.
 */
import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';

// same order as in `PatientSchedule.js` of mongoose model
export const DialysisScheduleKeyFromIndex = [
  'monday_items',
  'tuesday_items',
  'wednesday_items',
  'thursday_items',
  'friday_items',
  'saturday_items'
];

export const nationOptions = [
  '汉族', '壮族', '满族', '回族', '苗族', '维吾尔族', '土家族',
  '彝族', '蒙古族', '藏族', '布依族', '侗族', '瑶族', '朝鲜族',
  '白族', '哈尼族', '哈萨克族', '黎族', '傣族', '畲族', '傈僳族',
  '仡佬族', '东乡族', '高山族', '拉祜族', '水族', '佤族', '纳西族',
  '羌族', '土族', '仫佬族', '锡伯族', '柯尔克孜族', '达斡尔族', '景颇族',
  '毛南族', '撒拉族', '布朗族', '塔吉克族', '阿昌族', '普米族', '鄂温克族',
  '怒族', '京族', '基诺族', '德昂族', '保安族', '俄罗斯族', '裕固族',
  '乌兹别克族', '门巴族', '鄂伦春族', '独龙族', '塔塔尔族', '赫哲族', '珞巴族'
];

export const genderOptions = [
  {value: 'Male', name: '男'},
  {value: 'Female', name: '女'}
];

export const ckdStageOptions = [
  {value: '1', name: '一期'},
  {value: '2', name: '二期'},
  {value: '3', name: '三期'},
  {value: '4', name: '四期'},
  {value: '5', name: '五期'}
];

export const bloodTypeOption = [
  {value: '', name: ''},
  {value: 'A', name: 'A型血'},
  {value: 'B', name: 'B型血'},
  {value: 'O', name: 'O型血'},
  {value: 'AB', name: 'AB型血'},
];

export const diagnosisReason = [
  '慢性肾小球肾炎',
  '糖尿病肾病',
  '狼疮性肾病',
  '紫癜性肾炎',
  '血管炎肾损伤',
  '高血压性肾损伤',
  '间质性肾炎',
  '梗阻性肾炎',
  '遗传性肾病',
  '多囊肾',
  '多脏器功能不全',
  '病因不明'
];

export const systemOptions = [
  {value: '', name: ''},
  {value: '呼吸系统', name: '呼吸系统'},
  {value: '循环系统', name: '循环系统'},
  {value: '消化系统', name: '消化系统'},
  {value: '泌尿系统', name: '泌尿系统'},
  {value: '内分泌系统', name: '内分泌系统'},
  {value: '神经系统', name: '神经系统'},
  {value: '肌肉骨骼系统', name: '肌肉骨骼系统'}
];

export const kidneyTypeOption = [
  {value: '', name: ''},
  {value: '慢性肾小球肾炎', name: '慢性肾小球肾炎'},
  {value: '隐匿型肾炎', name: '隐匿型肾炎'},
  {value: '过敏性紫癜肾', name: '过敏性紫癜肾'},
  {value: '肾盂肾炎', name: '肾盂肾炎'}
];

export const diagnosisOptions = [
  {value: '', name: ''},
  {value: '原发性肾小球疾病', name: '原发性肾小球疾病'},
  {value: '继发性肾小球疾病', name: '继发性肾小球疾病'},
  {value: '遗传性及先天性肾病', name: '遗传性及先天性肾病'},
  {value: '肾小管间质疾病', name: '肾小管间质疾病'},
  {value: '泌尿系肿瘤', name: '泌尿系肿瘤'},
  {value: '泌尿系感染和结石', name: '泌尿系感染和结石'},
  {value: '肾脏切除术后', name: '肾脏切除术后'},
  {value: '急性肾衰', name: '急性肾衰'},
  {value: '移植肾失功', name: '移植肾失功'},
  {value: '不详', name: '不详'}
];

export const patientTypeOptions = [
  {value: 'ckd', name: 'CKD'},
  {value: 'hemodialysis', name: '血液透析患者'},
  {value: 'peritoneal', name: '腹膜透析患者'}
];

export const medicareTypeOptions = [
  {value: 'country', name: '城乡居民基本医疗保险'},
  {value: 'town', name: '城镇职工基本医疗保险'}
];

export const maritalStatusOptions = [
  {value: 'single', name: '未婚'},
  {value: 'married', name: '已婚'},
  {value: 'divorce', name: '离异'}
];

export const educationDegreeOptions = [
  {value: 'primary', name: '小学'},
  {value: 'junior', name: '初中'},
  {value: 'senior', name: '高中'},
  {value: 'college', name: '大专'},
  {value: 'bachelor', name: '本科'},
  {value: 'master', name: '硕士'},
  {value: 'doctor', name: '博士'}
];

export const relationOptions = [
  {value: 'parent', name: '父母'},
  {value: 'spouse', name: '配偶'},
  {value: 'child', name: '儿女'}
];

export const roleOptions = [
  {value: 'doctor', name: '医生'},
  {value: 'director', name: '主任'},
  {value: 'admin', name: '管理员'},
  {value: 'superadmin', name: '超级管理员'}
];

export const sheetOptions = [
  {value: '生化1', name: '生化1'},
  {value: '血常规', name: '血常规'},
  {value: '血型', name: '血型'},
  {value: '凝血常规', name: '凝血常规'},
  {value: '贫血全套+铁四项', name: '贫血全套+铁四项'},
  {value: '肝炎病毒学检验+HIV抗体+梅毒抗体', name: '肝炎病毒学检验+HIV抗体+梅毒抗体'},
  {value: '甲状旁腺激素', name: '甲状旁腺激素'}
];

export const dialysis = {
  methods: [
    'HD',
    'HDF',
    'HF',
    'HP',
    'SLED',
    'CVVH',
    'CVVHDF',
    'CVVHD'
  ],
  paths: [
    {name: 'AVF'},
    {
      name: 'AVG',
      positions: [
        '左 ',
        '右 ',
        '前臂',
        '上臂',
        '顺序',
        '反穿'
      ]
    },
    {
      name: '静脉置管',
      positions: [
        '临时',
        'CUFF',
        '左',
        '右',
        '颈内',
        '股V',
        '锁骨下',
        '直穿'
      ]
    }
  ],
  machineTypes: [
    {value: '贝朗Dialog+', name: '贝朗Dialog+'},
    {value: '费森尤斯4008B', name: '费森尤斯4008B'},
    {value: '日机装DBB-22B', name: '日机装DBB-22B'},
    {value: '金宝AK96', name: '金宝AK96'},
    {value: 'JMS-SDS-20', name: 'JMS-SDS-20'},
    {value: '东丽TR-8000', name: '东丽TR-8000'},
    {value: 'NIPRO NCU-12', name: 'NIPRO NCU-12'}
  ],
  dialyserType: [
    {value: 'Syntra 120', name: 'Syntra 120'},
    {value: 'Syntra 160', name: 'Syntra 160'},
    {value: 'MK09-II', name: 'MK09-II'},
    {value: 'AF-12', name: 'AF-12'},
    {value: 'F16', name: 'F16'},
    {value: 'F18', name: 'F18'}
  ],
  disinfectionType: [
    {value: '高温', name: '高温'},
    {value: '化学', name: '化学'}
  ],
  abnormal: [
    [
      '透析器凝血',
      '过敏',
      '休克',
      '低血压',
      '失衡',
      '肌肉痉挛',
      '低血糖',
      '脱水误差大于1kg',
      '脱水误差加0.5kg',
      '空气栓塞',
      '溶血'
    ],
    [
      '残余消毒剂反应',
      '首透综合征',
      '致热源反应',
      '破膜',
      '生物不相容',
      '管路阻塞',
      '通路感染',
      '穿刺处严重血肿',
      '漏血大于150ml'
    ],
    [
      '针头扎伤',
      '导管功能下降',
      '内瘘功能下降',
      '外部消毒',
      '内部消毒',
      '其它'
    ]
  ],
  tempOrder: [
    '贫血全套+铁四项',
    '肝炎病毒学检验＋hiv抗体＋梅毒抗体',
    '生化1',
    '凝血常规',
    '血型',
    '血常规',
    '甲状旁腺激素'
  ]
};

export const pathologic = {
  classify: [
    '原发性肾小球疾病',
    '继发性肾小球疾病',
    '遗传性及先天性肾病',
    '肾小管间质疾病'
  ],
  primary: [
    [
      '肾小球轻微病变',
      '微小病变性肾病',
      '局灶节段性肾小球损害',
      '膜性肾病',
      '系膜增殖性肾炎'
    ],
    [
      'IgA肾病',
      '毛细血管内增殖性肾炎',
      '膜增殖性肾炎',
      '新月体肾炎',
      '硬化性肾炎'
    ]
  ],
  secondary: [
    [
      '高血压肾损害',
      '糖尿病肾病',
      '肥胖相关性肾病',
      '淀粉样变性',
      '多发骨髓瘤肾病'
    ],
    [
      '冷球蛋白血症性肾炎',
      '轻链性肾病',
      '狼疮性肾炎',
      '过敏紫癜性肾炎',
      '抗基底膜肾炎(GoodPasture综合症)'
    ],
    [
      '系统性血管炎',
      '血栓性微血管病',
      '干燥综合症肾损害',
      '硬皮病肾损害',
      '乙型肝炎病毒相关性肾炎'
    ],
    [
      '丙型肝炎病毒相关性肾炎',
      'HIV相关性肾损害',
      '流行性出血热肾损害'
    ]
  ],
  genetic: [
    [
      'Alport综合征',
      '薄基底膜肾病',
      '近端肾小管损害及Fanconi综合征',
      'Bartter综合征',
      'Fabry综合征'
    ],
    [
      '脂蛋白肾病'
    ]
  ],
  tubule: [
    '急性肾小管间质性肾炎',
    '慢性肾小管间质性肾炎',
    '急性肾小管坏死',
    '马兜铃酸肾病'
  ]
};

export const followup = {
  symptoms: [
    [
      '浮肿',
      '腰痛',
      '血尿',
      '泡沫尿',
      '尿量减少',
      '尿量增多',
      '夜尿增多',
      '尿频'
    ],
    [
      '尿急',
      '尿痛',
      '头晕',
      '头痛',
      '耳鸣',
      '疲倦',
      '乏力',
      '恶心'
    ],
    [
      '呕吐',
      '纳差',
      '失眠',
      '皮肤瘙痒',
      '全身不适',
      '胸闷',
      '心累气促',
      '心衰'
    ],
    [
      '血压升高',
      '关节疼痛',
      '口腔溃疡',
      '皮疹',
      '脱发',
      '光敏',
      '咯血',
      '咳嗽'
    ],
    [
      '咳痰',
      '呼吸困难',
      '发热'
    ]
  ],
  sheetTypes: ['贫血全套+铁四项', '肝炎病毒学检验+HIV抗体+梅毒抗体', '生化1', '凝血常规', '血型', '血常规', '甲状旁腺激素'],
  followupTypeOptions: [
    {value: 'tel', name: '电话'},
    {value: 'outpatient', name: '门诊'},
    {value: 'inpatient', name: '住院'}
  ],
  edema: [
    {value: 'awful', name: '重度'},
    {value: 'bad', name: '中度'},
    {value: 'slight', name: '轻度'},
    {value: '', name: '无'}
  ],
  irrigation: [
    {value: 'normal', name: '通畅'},
    {value: 'inblock', name: '流入梗阻'},
    {value: 'outblock', name: '流出梗阻'},
    {value: 'bothblock', name: '双向梗阻'}
  ],
  transport: [
    {value: 'high', name: '高转运'},
    {value: 'high_avg', name: '高平均转运'},
    {value: 'low_avg', name: '低平均转运'},
    {value: 'low', name: '低转运'}
  ],
  outcome: [
    {value: 'cure', name: '痊愈'},
    {value: 'extubation', name: '拔管'},
    {value: 'die', name: '死亡'},
    {value: 'giveup', name: '放弃'}
  ],
  drugUsage: [
    {value: 'oral', name: '口服'},
    {value: 'external', name: '外用'},
    {value: 'injection', name: '注射'},
    {value: 'decoction', name: '煎服'}
  ],
  society: [
    '能工作',
    '能帮忙做家务',
    '生活能自理',
    '需专人陪护'
  ],
  condition: [
    [
      '引流不畅',
      '单向梗塞',
      '双向梗塞',
      '管中渗漏',
      '涤纶套外露',
      '疝',
      '腹壁及外周生殖器水肿'
    ],
    [
      '胸水',
      '腰背痛',
      '血性透出液',
      '透出液浑浊',
      '出液疼痛',
      '入液疼痛'
    ]
  ],
  peritonitis: [
    [
      '透出液浑浊',
      '腹痛',
      '胃寒',
      '发热',
      '恶心/呕吐',
      '超滤量减少',
      '引流不畅'
    ],
    [
      '堵管',
      '腹泻',
      '出口处红肿',
      '腹膜刺激征'
    ]
  ]
};


export const searchFields = [{
  name: '患者信息',
  collection: 'Patient',
  fields: [
    {
      id: '1001',
      name: '姓名',
      field: ['real_name', 'name'],
    },
    {
      id: '1002',
      name: '性别',
      field: 'gender',
      selections: genderOptions
    },
    {
      id: '1003',
      name: '身份证',
      field: 'person_id',
      width: '160px'
    },
    {
      id: '1004',
      name: '电话',
      field: 'mobile',
      width: '100px'
    },
  ]
}];

export const patientColumns = {
  '编号': {
    display: '$index'
  },
  '姓名': {
    field: 'real_name', display: (name, model) => {
      const link = `/patient/${model._id}`;
      return (<LinkContainer to={link}><a>{name}</a></LinkContainer>);
    }
  },
  '性别': {
    field: 'gender', display: (gender) => {
      return gender === 'Male' ? '男' : '女';
    }
  },
  '门诊号': {
    field: 'birthday', display: 'string'
  },
  '年龄': {
    field: 'birthday', display: (birthday) => {
      return birthday.substr(0, 10);
    }
  },
  '身份证': {
    field: 'person_id', display: 'string'
  }
};

export const allergy = {
  classify: [
    '透析器材过敏',
    '药物过敏',
    '其它'
  ],
  devices: [
    '透析膜',
    '消毒剂'
  ],
  film: [
    '聚砜膜（PS）',
    '聚甲基丙烯酸甲脂膜(PMMA)',
    '其它合成膜',
    '醋酸纤维膜',
    '血肪膜',
    '其它'
  ],
  disinfectant: [
    '环氧乙烷',
    '过氧乙酸',
    '其它'
  ],
  drug: [
    '抗生素',
    '静脉铁剂',
    '肝素',
    '其它'
  ],
  heparin: [
    '肝素诱导的血小板减少症',
    '其它'
  ]
};

