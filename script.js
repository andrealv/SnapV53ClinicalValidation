$(document).ready(function() {
  var dictionaryOfImages, nextProcessAfterCompletion, DashBoardLinks, DashBoardIcons, Months, currentScreen, firstProcessAtLogIn, checkBoxList, userEnrolledKey, currentRound, processHistoricVar, userPassword, inputList, searchKey, sFormatType, sFormat, sValueToCheck, pPercentage, pProgressBarWidth, variableName, linkID, pList, pDictionaryKey, pDictionaryKeyValue, pFieldKey1, pFieldKeyValue1, pFieldKey2, pFieldKeyValue2, pFieldName, pListItemID, pDictionaryAttributeValue, outcomeAndFieldMappingList, currentTemplate, varObj, currentField, varProcessList, S7FirstDisplay, currentFormatElement, SDKoutput, currentValueElement, pVerificationCode, pProcessDefKey, pUserID, pPassword, pOutcome, pUserName, pVariables, pFields, pOutcomes, inputListOfObj, logInForProcessAndCredentialsReturnValue, pErrorData, initSDKReturnValue, userID, tempListKey, processDefKey, SDKGetFirstTaskReturnValue, currentProperty, j, currentFieldIsRequired, returnError, txt1PlaceHolder, txt2PlaceHolder, txt3PlaceHolder, txt4PlaceHolder, TSC1localCurrentFieldName, currentOutcome, TSC1CheckRequiredFieldsRet, numberOfWrongLogInAttempts, LVcells, lastOptionValue, checkBoxElement, checkBoxValue;
  /**
   * Describe this function...
   */
  function setOutcomeAndFieldMapping(inputList, searchKey) {
    // Block#: p|LCGP/J#g9k=Rq^TQZh
    outcomeAndFieldMappingList = [];
    // Block#: OO:{#dPqM$jHyF=erl,6
    for(var inputListItem_index in inputList) {
      inputListItem = inputList[inputListItem_index];
      // Block#: ]LR8aSySdnfQ1^ecAb?2
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Dictionary.getDictValue(inputListItem, 'id'), "EQUAL", searchKey)) {
        // Block#: LY}(A$@CUc(R|l34gGzp
        outcomeAndFieldMappingList = (com.fc.JavaScriptDistLib.Dictionary.getDictValue(inputListItem, 'enumValues'));
        // Block#: K@(.1zk=7GR@C,digL0n
        if(true) {
          return;
        }
      }
    }
  }
  /**
   * Describe this function...
   */
  function checkFormat(sFormatType, sFormat, sValueToCheck) {
    // Block#: e;B-UPjVwvc!|67ARP(%
    if(com.fc.JavaScriptDistLib.TextLib.textComparison(sFormatType, "EQUAL", 'e-mail')) {
      // Block#: u{#KZUxiWi}cj7sqG,.W
      if(!com.fc.JavaScriptDistLib.TextLib.textContains(sValueToCheck, '@')) {
        return false;
      }
    } else if(com.fc.JavaScriptDistLib.TextLib.textComparison(sFormatType, "EQUAL", 'time')) {
      // Block#: /sBm1)}ISC[qWrSo^E!y
      if(!com.fc.JavaScriptDistLib.MathLibrary.mathCompare(sFormat.length, "EQ", sValueToCheck.length)) {
        return false;
      }
      // Block#: S;81kOS):Y,emL]7/2Mt
      var index_end = sValueToCheck.length - 1;
      var index_inc = 1;
      if(0 > index_end) {
        index_inc = -index_inc;
      }
      for(index = 0; index_inc >= 0 ? index <= index_end : index >= index_end; index += index_inc) {
        // Block#: mKUEE}8ckKJL=0FTItqp
        currentFormatElement = com.fc.JavaScriptDistLib.TextLib.textSubstring(sFormat, index, 1);
        // Block#: 8q|LSsCIsdBTQ+vkr[r?
        currentValueElement = com.fc.JavaScriptDistLib.TextLib.textSubstring(sValueToCheck, index, 1);
        // Block#: ?tsI:2-_:4Qs_wUC2[oB
        if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentFormatElement, "EQUAL", '0') &&
          !com.fc.JavaScriptDistLib.MathLibrary.isNumber(com.fc.JavaScriptDistLib.MathLibrary.toNumber(currentValueElement))
        ) {
          return false;
        }
        // Block#: ^=$DbQ|dZRDYzohW)Y0Z
        if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentFormatElement, "EQUAL", ':') &&
          !com.fc.JavaScriptDistLib.TextLib.textComparison(currentValueElement, "EQUAL", ':')
        ) {
          return false;
        }
      }
      // Block#: sH(SmvoP,)kDWo`H;noV
      if(com.fc.JavaScriptDistLib.MathLibrary.mathCompare(com.fc.JavaScriptDistLib.MathLibrary.toNumber(com.fc.JavaScriptDistLib.TextLib.textSubstring(sValueToCheck, 3, 2)), "GT", 59)) {
        return false;
      }
      // Block#: E[B[+l-Zvz#:oK4]6PBM
      if(com.fc.JavaScriptDistLib.MathLibrary.mathCompare(com.fc.JavaScriptDistLib.MathLibrary.toNumber(com.fc.JavaScriptDistLib.TextLib.textSubstring(sValueToCheck, 0, 2)), "GT", 23)) {
        return false;
      }
    } else if(com.fc.JavaScriptDistLib.TextLib.textComparison(sFormatType, "EQUAL", 'date')) {
      // Block#: [-$(Rj,#twCQJH;dpq12
      if(com.fc.JavaScriptDistLib.MathLibrary.mathCompare(sFormat.length, "EQ", sValueToCheck.length)) {
        return false;
      }
      // Block#: ;8x;P:]bu;aYjd?q~]CH
      var index_end2 = sValueToCheck.length - 1;
      var index_inc2 = 1;
      if(0 > index_end2) {
        index_inc2 = -index_inc2;
      }
      for(index = 0; index_inc2 >= 0 ? index <= index_end2 : index >= index_end2; index += index_inc2) {
        // Block#: g*Q/QgTKE[RXLt#pmGM0
        currentFormatElement = com.fc.JavaScriptDistLib.TextLib.textSubstring(sFormat, index, 1);
        // Block#: 0LFJ]:m|Wf7N@ns/C.=A
        currentValueElement = com.fc.JavaScriptDistLib.TextLib.textSubstring(sValueToCheck, index, 1);
        // Block#: !J+L(Pml]nHBkcXCAQot
        if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentFormatElement, "EQUAL", '0') &&
          !com.fc.JavaScriptDistLib.MathLibrary.isNumber(com.fc.JavaScriptDistLib.MathLibrary.toNumber(currentValueElement))
        ) {
          return false;
        }
        // Block#: R{n9K#:FVSsO]tEIKw@g
        if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentFormatElement, "EQUAL", '/') &&
          !com.fc.JavaScriptDistLib.TextLib.textComparison(currentValueElement, "EQUAL", '/')
        ) {
          return false;
        }
      }
      // Block#: p{rydoS5zNf)I+Yk!Clp
      if(com.fc.JavaScriptDistLib.MathLibrary.mathCompare(com.fc.JavaScriptDistLib.MathLibrary.toNumber(com.fc.JavaScriptDistLib.TextLib.textSubstring(sValueToCheck, 0, 2)), "GT", 31)) {
        return false;
      }
      // Block#: E,qr#3oX{A@d=#^m^%oY
      if(com.fc.JavaScriptDistLib.MathLibrary.mathCompare(com.fc.JavaScriptDistLib.MathLibrary.toNumber(com.fc.JavaScriptDistLib.TextLib.textSubstring(sValueToCheck, 3, 2)), "GT", 12)) {
        return false;
      }
      // Block#: ]MK~w_9#,u|V(;vs+QPG
      if(com.fc.JavaScriptDistLib.MathLibrary.mathCompare(com.fc.JavaScriptDistLib.MathLibrary.toNumber(com.fc.JavaScriptDistLib.TextLib.textSubstring(sValueToCheck, 5, 4)), "GT", 2017)) {
        return false;
      }
    }
    return true;
  }
  /**
   * Describe this function...
   */
  function displayPageEngine() {
    // Block#: xJ]x$E4pHy,hO?=TW;Cq
    currentTemplate = getFieldFromListWithKeys((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'variables')), 'id', 'templateType', '', '', 'name');
    // Block#: )~,Dm;AGE|6[e?@-K?jp
    if(currentTemplate == 'TSC1') {
      // Block#: tDF0^Z{11NMdNz__E)2W
      S7FirstDisplay = true;
      // Block#: KgrUlFL5~K~dq*oL8zj-
      let hideScreen = $('.HTML5-deploy-wrapper .Screen:visible');
      hideScreen.hide();
      let showScreen = $('[obj-name="S7MultipleText"]');
      showScreen.show();
      history.pushState({
        'view': 'S7MultipleText'
      }, 'S7MultipleText', 'S7MultipleText');
      hideScreen.triggerHandler('hide');
      showScreen.triggerHandler('show');
    } else if(currentTemplate == 'TQL1') {
      // Block#: DL#3m,8)CQu%amC|g4D-
      let hideScreen = $('.HTML5-deploy-wrapper .Screen:visible');
      hideScreen.hide();
      let showScreen = $('[obj-name="S6MultipleChoice"]');
      showScreen.show();
      history.pushState({
        'view': 'S6MultipleChoice'
      }, 'S6MultipleChoice', 'S6MultipleChoice');
      hideScreen.triggerHandler('hide');
      showScreen.triggerHandler('show'); // Block#: YE,MY]E=;Lj~`6_JxQDR
      S6MultipleChoiceUpdateScreen();
    } else if(currentTemplate == 'TPSW') {
      // Block#: yH!*Zq/wtKQSo^;zUL,(
      let hideScreen = $('.HTML5-deploy-wrapper .Screen:visible');
      hideScreen.hide();
      let showScreen = $('[obj-name="S5Pass"]');
      showScreen.show();
      history.pushState({
        'view': 'S5Pass'
      }, 'S5Pass', 'S5Pass');
      hideScreen.triggerHandler('hide');
      showScreen.triggerHandler('show'); // Block#: hzr`oBpwU6YGlBjRS]`F
      S5PassUpdateScreen();
    } else if(currentTemplate == 'S1Dashboard') {
      // Block#: vj;rJ!:qCO,YioV@%kKx
      let hideScreen = $('.HTML5-deploy-wrapper .Screen:visible');
      hideScreen.hide();
      let showScreen = $('[obj-name="S1Dashboard"]');
      showScreen.show();
      history.pushState({
        'view': 'S1Dashboard'
      }, 'S1Dashboard', 'S1Dashboard');
      hideScreen.triggerHandler('hide');
      showScreen.triggerHandler('show'); // Block#: ZPdZjU`,vVFhd+`/8%y4
      S1DashhboardUpdateScreen();
    }
  }
  /**
   * Describe this function...
   */
  function setProgressBar(pPercentage, pProgressBarWidth) {
    return(pPercentage * pProgressBarWidth) / 100;
  }
  /**
   * Describe this function...
   */
  function followLink(variableName, linkID) {
    // Block#: C0A8BFZd!fmGd3E$_idG
    varObj = com.fc.JavaScriptDistLib.Dictionary.createEmptyDictionary();;
    // Block#: cxv`#nzdmu?|.Mb@#FHF
    varProcessList = [];
    // Block#: }lbri.@}uf.a)-jrImKx
    com.fc.JavaScriptDistLib.ListLibrary.listAdd(varProcessList, com.fc.JavaScriptDistLib.Dictionary.createDictionary(['name', 'type', 'value', 'scope'], [variableName, 'string', linkID, 'local']))
  }
  /**
   * Describe this function...
   */
  function getDictionaryFromListWithKey(pList, pDictionaryKey, pDictionaryKeyValue) {
    // Block#: .}lHH==!j=~c4tJ|3uo[
    for(var item_index in pList) {
      item = pList[item_index];
      // Block#: fRFqqJSw3:#)Sb5zy/V.
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Dictionary.getDictValue(item, pDictionaryKey), "EQUAL", pDictionaryKeyValue)) {
        return com.fc.JavaScriptDistLib.Dictionary.getDictValue(item, pDictionaryKey);
      }
    }
    return '';
  }
  /**
   * Describe this function...
   */
  function getFieldFromListWithKeys(pList, pFieldKey1, pFieldKeyValue1, pFieldKey2, pFieldKeyValue2, pFieldName) {
    // Block#: LuT[B6PmgKu6AR]c)#{_
    for(var item_index2 in pList) {
      item = pList[item_index2];
      // Block#: :};GjSg%1V(zs*352FqY
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Dictionary.getDictValue(item, pFieldKey1), "EQUAL", pFieldKeyValue1)) {
        // Block#: *N-ybqtrUa`w@-mT:h2R
        if(com.fc.JavaScriptDistLib.TextLib.textComparison(pFieldKey2, "EQUAL", '')) {
          return com.fc.JavaScriptDistLib.Dictionary.getDictValue(item, pFieldName);
        }
        // Block#: +S23MPRoJa7z-*ELYGNP
        if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Dictionary.getDictValue(item, pFieldKey2), "EQUAL", pFieldKeyValue2)) {
          return com.fc.JavaScriptDistLib.Dictionary.getDictValue(item, pFieldName);
        }
      }
    }
    return '';
  }
  /**
   * Describe this function...
   */
  function setDictionaryAtttributeInList(pList, pListItemID, pDictionaryKey, pDictionaryAttributeValue) {
    // Block#: ;p|(%BjM$=jgi$V:LxO^
    currentField = pList[pListItemID];
    // Block#: d,h}XCm})h3_Fb9v9wyS
    com.fc.JavaScriptDistLib.Dictionary.setDictValue(currentField, pDictionaryKey, pDictionaryAttributeValue);
    // Block#: tkbpEbF=R?+|`h^y.nJP
    pList[pListItemID] = currentField;
  }
  /**
   * Describe this function...
   */
  function initSDKFirstLogIn(pVerificationCode) {
    // Block#: O!E`Oxf*]1U:dQYSg-{r
    delSDKLists();
    // Block#: R#,@Hb21(slQkE|46+4J
    userID = pVerificationCode;
    // Block#: 9IV6VmH$XlI^hb(q9CA5
    processDefKey = 'firstLogIn';
    // Block#: =`(0~qn?OO8lgK@NH{;u
    com.fc.JavaScriptDistLib.SnappClinical.snappClinicalConfigure(userID, 'P4ssw0RD$!', userID, 'mobileApp', 'https://staging.snapclinical.net:8443');
    // Block#: M1X$diW;#Ac^YBW4exe7
    SDKGetFirstTask2(processDefKey);
  }
  /**
   * Describe this function...
   */
  function logInForProcessAndCredentials3(pProcessDefKey, pUserID, pPassword) {
    // Block#: HyX#.ab3V1m66j]|-I|4
    logInForProcessAndCredentialsReturnValue = false;
    // Block#: %H^b$zW1OJWJN,ae7|{:
    delSDKLists();
    // Block#: fjeimvkYc%CN!;Ye8vb^
    userID = pUserID;
    // Block#: n$[4)?LYIx0m.Y?Se@(2
    processDefKey = pProcessDefKey;
    // Block#: ,Mt_3z7y0(Gr@A+qlQjS
    com.fc.JavaScriptDistLib.SnappClinical.snappClinicalConfigure(pUserID, pPassword, pUserID, 'mobileApp', 'https://staging.snapclinical.net:8443');
    // Block#: j]7RY]$Hh,}j1z{zN,59
    SDKGetFirstTask3(pProcessDefKey);
  }
  /**
   * Describe this function...
   */
  function delSDKLists() {
    // Block#: V!S|!2#H0%?uy_#E?o;)
    SDKoutput = com.fc.JavaScriptDistLib.Dictionary.createDictionary(['variables', 'fields', 'outcomes', 'outcomeAndFieldMapping'], [
      [],
      [],
      [],
      []
    ]);
  }
  /**
   * Describe this function...
   */
  function logInForProcessAndCredentials2(pProcessDefKey, pUserID, pPassword) {
    // Block#: ]XK47Zl9DsF%HP1hD#}7
    logInForProcessAndCredentialsReturnValue = false;
    // Block#: [yZ9si9L)Dz++B(f.:g*
    delSDKLists();
    // Block#: @1ca^H{F4@cmy%7sSFmd
    userID = pUserID;
    // Block#: JB=;7az@FZf(r]ta@qBo
    processDefKey = pProcessDefKey;
    // Block#: $w9ew:Ko?ag*7rMtg07y
    com.fc.JavaScriptDistLib.SnappClinical.snappClinicalConfigure(pUserID, pPassword, pUserID, 'mobileApp', 'https://staging.snapclinical.net:8443');
    // Block#: l?t{/FMa4xfD9A|OS)OE
    SDKGetFirstTask2(pProcessDefKey);
  }
  /**
   * Describe this function...
   */
  function SDKGetFirstTask3(pProcessDefKey) {
    // Block#: I;SxF0Z8epoJW5?UK+HX
    com.fc.JavaScriptDistLib.SnappClinical.snappClinicalcreateNewInstanceAndGetFirstTask(pProcessDefKey, [],
      function(variables, fields, outcomes) {
        // Block#: :G-g5Y?iM)ESEVNFJlOx
        if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentScreen, "EQUAL", 'TLGI')) {
          // Block#: GdxijLd*,2{-e@iX$^Sk
          $('[obj-name="I4Hourglass"]').hide();
        } else if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentScreen, "EQUAL", 'TFTL')) {
          // Block#: ItHxbCy0[QJ-cNtPFoTZ
          $('[obj-name="I3Hourglass"]').hide();
        } else if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentScreen, "EQUAL", 'TPSW')) {
          // Block#: rh6QY$?GS^9/[#k{^eKY
          $('[obj-name="I5Hourglass"]').hide();
        }
        // Block#: 5!%Gko,3oo-7{iudBqiu
        SDKShowTask(variables, fields, outcomes);
        // Block#: ?*BgN[KK~#rFp:H=F%t,
        SDKGetFirstTaskReturnValue = true;
      },
      function(error_data) {
        // Block#: /|l=ZyAz,OT^^yZk?u}4
        if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentScreen, "EQUAL", 'TLGI')) {
          // Block#: *P2%/%1E:1Z^yN1uaVdh
          $('[obj-name="I4Hourglass"]').hide(); // Block#: Ho5AC2Fm.[a}g|y;4?q2
          updatewrongLogInAttempts();
        } else if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentScreen, "EQUAL", 'TFTL')) {
          // Block#: _;7.qe.UmLy[#Hpb^5|+
          $('[obj-name="I3Hourglass"]').hide(); // Block#: f4k5O^`IhbUi@3*T`[
          com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L3Info", 'You entered an incorrect Verification Code');
        } else if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentScreen, "EQUAL", 'TPSW')) {
          // Block#: X|?b;4g/I4-Q]v`Dm/IR
          $('[obj-name="I5Hourglass"]').hide();
        }
        // Block#: WifpcwWM*zTM@~}Hn)]h
        SDKGetFirstTaskReturnValue = false;
        // Block#: 2zS)uGm8NeBL?lK.!h^L
        pErrorData = error_data;
        // Block#: 4{^D/toMTCfJbVh8PG;G
        $('[obj-name="I3Hourglass"]').hide();
      });
  }
  /**
   * Describe this function...
   */
  function saveTaskAndNext(pOutcome) {
    // Block#: PQcY*h*qH]Mt;G!x6ety
    currentRound = currentRound + 1;
    // Block#: /_qYP*Tk9n0uIr+~Y?1c
    pErrorData = '';
    // Block#: A?kvDZev)hkHcuXhk8r-
    currentProperty = getFieldFromListWithKeys((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'variables')), 'id', 'switchToProcess', '', '', 'value');
    // Block#: /Sjsv]%8NYawwV0InVQy
    if(!!currentProperty.length) {
      // Block#: jD.uTMxIev1l%Xgl%=[2
      nextProcessAfterCompletion = (com.fc.JavaScriptDistLib.TextLib.convertToText(currentProperty));
    }
    // Block#: @XIxfI6=y}e2c7z:d4yt
    if(!(SDKoutput == null)) {
      // Block#: c2}R,~_Ja/Bm{q[7/}[R
      com.fc.JavaScriptDistLib.SnappClinical.snappClinicalSaveTaskVariables(com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'variables'), com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'), pOutcome,
        function() {
          // Block#: nmj:3e44@#vXJ3?j!LbZ
          delSDKLists();
          // Block#: YIp@843l^6Ozv^,K_PYK
          com.fc.JavaScriptDistLib.SnappClinical.snappClinicalMoveToNextTask(
            function(variables, fields, outcomes) {
              // Block#: pU.bpS4[Y,Z/Kt%BtUtw
              if(com.fc.JavaScriptDistLib.TextLib.textComparison(nextProcessAfterCompletion, "EQUAL", 'login')) {
                // Block#: )k|25AyA$m5htk*C-]K8
                let hideScreen = $('.HTML5-deploy-wrapper .Screen:visible');
                hideScreen.hide();
                let showScreen = $('[obj-name="S4Login"]');
                showScreen.show();
                history.pushState({
                  'view': 'S4Login'
                }, 'S4Login', 'S4Login');
                hideScreen.triggerHandler('hide');
                showScreen.triggerHandler('show');
              } else {
                // Block#: }sb6I%e(rYi?^rLwW|yx
                logInForProcessAndCredentials2(nextProcessAfterCompletion, userID, userPassword);
              }
            },
            function(error_data) {
              // Block#: {)9LX(Pc:3W2]T1:xfNZ
              pErrorData = error_data;
              // Block#: fn8rxhRDW~dYPur^l]!G
              if(com.fc.JavaScriptDistLib.TextLib.textComparison(userPassword, "EQUAL", '') &&
                com.fc.JavaScriptDistLib.TextLib.textComparison(currentScreen, "EQUAL", 'TSC1')
              ) {
                // Block#: `%_m=-{6$hPU/i%uL+yG
                $('[obj-name="I7Hourglass"]').hide();
              } else {
                // Block#: b;*%|Wnf-NX:~9Ewv2IZ
                com.fc.JavaScriptDistLib.SnappClinical.snappClinicalConfigure(userID, userPassword, userID, 'mobileApp', 'https://staging.snapclinical.net:8443');
                // Block#: E.^fVK2Ow9VD2b!Vr:Np
                processDefKey = 'firstLogIn';
                // Block#: oVPYcVw+G6Dlh@@58G4Q
                SDKGetFirstTask2(processDefKey);
              }
            });
        },
        function(error_data) {
          // Block#: Z6YA`MkZs!B?#04Ic1(q
          pErrorData = error_data;
          // Block#: Xy@h9.f/CJ@hk{hgj9VN
          $('[obj-name="I7Hourglass"]').hide();
        });
    } else {
      // Block#: fVd;f8sQ|]fuQsxCr`Hi
      com.fc.JavaScriptDistLib.SnappClinical.snappClinicalMoveToNextTask(
        function(variables, fields, outcomes) {
          // Block#: t+n+dqwLzIP@_qX:ld]l
          if(com.fc.JavaScriptDistLib.TextLib.textComparison(nextProcessAfterCompletion, "EQUAL", 'login')) {
            // Block#: |WZ}E!P[fx7qSMVRy[SV
            let hideScreen = $('.HTML5-deploy-wrapper .Screen:visible');
            hideScreen.hide();
            let showScreen = $('[obj-name="S4Login"]');
            showScreen.show();
            history.pushState({
              'view': 'S4Login'
            }, 'S4Login', 'S4Login');
            hideScreen.triggerHandler('hide');
            showScreen.triggerHandler('show');
          } else {
            // Block#: *W=na(gXw)vwm`R9Xh|J
            logInForProcessAndCredentials2(nextProcessAfterCompletion, userID, userPassword);
          }
        },
        function(error_data) {
        });
    }
    return pErrorData;
  }
  /**
   * Describe this function...
   */
  function initSDK(pProcessDefKey, pUserName, pPassword) {
    // Block#: ArV-lNX./6]_c~m6]L1l
    initSDKReturnValue = false;
    // Block#: euL8~G6gwr7Zfw[wb/{X
    delSDKLists();
    // Block#: 1n(O102C2B6NMz3Iq~BK
    processDefKey = pProcessDefKey;
    // Block#: sZnarlvP8SR?GMlt5Oc!
    com.fc.JavaScriptDistLib.SnappClinical.snappClinicalConfigure(pUserName, pPassword, pUserName, 'mobileApp', 'https://staging.snapclinical.net:8443');
    // Block#: )3Yz;cTs3qH^oA,KJuR%
    SDKGetFirstTask2(pProcessDefKey);
    return initSDKReturnValue;
  }
  /**
   * Describe this function...
   */
  function initImages() {
    // Block#: j!DW0f]!{s*x-r;MEq0Y
    dictionaryOfImages = com.fc.JavaScriptDistLib.Dictionary.createEmptyDictionary();;
    // Block#: ^P0_t%yz[2iD3,}MOie/
    com.fc.JavaScriptDistLib.Dictionary.setDictValue(dictionaryOfImages, 'about', com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/ea64ee99-7090-441b-bbd2-d294211382c5"));
    // Block#: YMQ^th80K!U%RAWD!Uy{
    com.fc.JavaScriptDistLib.Dictionary.setDictValue(dictionaryOfImages, 'doctor', com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/b10e75dd-5e33-4e5c-8c05-9d70616a1c4c"));
    // Block#: ad-]Q+6,j|$hxxVIC(H~
    com.fc.JavaScriptDistLib.Dictionary.setDictValue(dictionaryOfImages, 'documents', com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/d57cf0bc-247f-4436-aec5-5efe585ea874"));
    // Block#: e-ZPdopCe#6Yu|7UxD2A
    com.fc.JavaScriptDistLib.Dictionary.setDictValue(dictionaryOfImages, 'diagnose', com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/ef948692-c2dc-4f39-baaf-527313358cd1"));
    // Block#: [CJ4M.mHc%[??Ta)ZA`e
    com.fc.JavaScriptDistLib.Dictionary.setDictValue(dictionaryOfImages, 'eQualification', com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/22be2712-5285-4290-90fc-fc1404123234"));
    // Block#: L?uqz(hUx1Ijq!wX@JD~
    com.fc.JavaScriptDistLib.Dictionary.setDictValue(dictionaryOfImages, 'FAQ', com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/ea64ee99-7090-441b-bbd2-d294211382c5"));
    // Block#: 4#`;C(_Nu]SP(LpBmQnU
    com.fc.JavaScriptDistLib.Dictionary.setDictValue(dictionaryOfImages, 'footerLogo', com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/b4114f4f-72a7-4413-90a0-5422b0b784a1"));
    // Block#: 7XG~r#I^_c3m*aKf;OA;
    com.fc.JavaScriptDistLib.Dictionary.setDictValue(dictionaryOfImages, 'gender', com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/5500f01d-436a-45e7-98bb-30665addeb4e"));
    // Block#: PFj0IM^%0M}tX7{;PM6X
    com.fc.JavaScriptDistLib.Dictionary.setDictValue(dictionaryOfImages, 'Glucometer', com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/bec130a2-c6f0-48d4-9aaa-cd5b03575a0a"));
    // Block#: I?qDLjk32eK0Wb)}?U;M
    com.fc.JavaScriptDistLib.Dictionary.setDictValue(dictionaryOfImages, 'homewireless', com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/dc534750-9e07-4b41-b408-077be1b2bec2"));
    // Block#: He5Wr@(P6LBoA+:#)1VZ
    com.fc.JavaScriptDistLib.Dictionary.setDictValue(dictionaryOfImages, 'hospitalized', com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/6395f26d-eaa9-4112-8832-5115b50e2cf4"));
    // Block#: x!?U:+(l|lM+5O623f84
    com.fc.JavaScriptDistLib.Dictionary.setDictValue(dictionaryOfImages, 'hourglass', com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/e61d073c-141f-4ce0-b7c0-6faaffd73690"));
    // Block#: *Nr_rk{c1]k{~5CyNR)N
    com.fc.JavaScriptDistLib.Dictionary.setDictValue(dictionaryOfImages, 'insulin', com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/5bbfcabf-57fe-4579-b166-c9c20e15d763"));
    // Block#: rL8,W,@ZiG184]^E2U,p
    com.fc.JavaScriptDistLib.Dictionary.setDictValue(dictionaryOfImages, 'lock', com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/884b0bd2-8936-4a8a-920f-661244942a38"));
    // Block#: S*78a#`kZp,ZG8Y$@PNp
    com.fc.JavaScriptDistLib.Dictionary.setDictValue(dictionaryOfImages, 'mealTime', com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/c171217b-628b-4fd7-b952-e074e4e43ddc"));
    // Block#: .MAUsffqVeD$UGZ@vyB)
    com.fc.JavaScriptDistLib.Dictionary.setDictValue(dictionaryOfImages, 'notAllowed', com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/9c3d0080-a65c-43de-88ec-a7a08e2a1004"));
    // Block#: !%JmNUsQ_}?1*4`4Q|+w
    com.fc.JavaScriptDistLib.Dictionary.setDictValue(dictionaryOfImages, 'pregnant', com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/5d25f28a-a92d-4043-a9cb-788c82eb477a"));
    // Block#: ]K(27xHM.3@8O*w#9$NW
    com.fc.JavaScriptDistLib.Dictionary.setDictValue(dictionaryOfImages, 'processComplete', com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/5f1de44c-5f98-414a-8472-a71dd1126ce6"));
    // Block#: @xhUv.!7y_BskV(vA16b
    com.fc.JavaScriptDistLib.Dictionary.setDictValue(dictionaryOfImages, 'verification', com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/217e1921-4a36-42f0-95b3-0457793bdc29"));
  }
  /**
   * Describe this function...
   */
  function initialize() {
    // Block#: uE1FjbH{=o8W)30_A8(r
    nextProcessAfterCompletion = '';
    // Block#: :g$3G_rzIC#oxTOo1LY%
    DashBoardLinks = ['Contact Us', 'About Us', 'Terms'];
    // Block#: ]LZ;}j%KJz3]Dhk1]jj5
    DashBoardIcons = [(com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/2762b0b9-3577-487b-819f-1ef246f6fb3b")), (com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/d9869bda-c07f-4675-80a2-6a0c2d5ad2dc")), (com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/9aa72d25-61d7-4670-90a7-7836cebffeca"))].join('');
    // Block#: vP52y0+*/,`si0_jaVLO
    Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // Block#: 0x(6aiB0BYFoXP84=Rem
    currentScreen = 'TFTL';
    // Block#: BUfwO#NYXwrN}Bi=?V!i
    firstProcessAtLogIn = 'firstLogIn';
    // Block#: |g:0JG/+euG@kitS?s|~
    checkBoxList = [];
    // Block#: .?m(m|m_zeo~qi/`ZpOG
    userEnrolledKey = 'userEnrolled';
    // Block#: jq62Vjag@a|x^1`95!bp
    currentRound = 0;
    // Block#: /DLv0dqj0I%Bn!qdB]JZ
    initImages();
    // Block#: lYk/n4Y3k}7.-*p`Uy0d
    processHistoricVar = com.fc.JavaScriptDistLib.Dictionary.createEmptyDictionary();;
    // Block#: :ljf*K{nH@iY@2!-c^(n
    userPassword = '';
  }
  /**
   * Describe this function...
   */
  function SDKGetFirstTask2(pProcessDefKey) {
    // Block#: ]22]jBqy`HL#Ij(-og4?
    com.fc.JavaScriptDistLib.SnappClinical.snappClinicalGetNextTaskOnProcess(pProcessDefKey,
      function(variables, fields, outcomes) {
        // Block#: Y)/xE+qwp~h7m`Otv[cf
        SDKShowTask(variables, fields, outcomes);
        // Block#: r*V=J9+/+Eb4}jlP1q=s
        SDKGetFirstTaskReturnValue = true;
      },
      function(error_data) {
        // Block#: UY@U9A`X9kOG?GtSNWh+
        if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentScreen, "EQUAL", 'TLGI')) {
          // Block#: [_m2/z*PQ97ghF$j@`mj
          updatewrongLogInAttempts();
        }
        // Block#: 4E^UE^FbTSZCg%_mPECs
        if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentScreen, "EQUAL", 'TFTL')) {
          // Block#: c%szFXU~;;ya|;x/*}4G
          $('[obj-name="I3Hourglass"]').hide(); // Block#: Y,VO1x/h~!h1MD]:FVYu
          com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L3Info", 'You entered an incorrect Verification Code');
        }
        // Block#: neZQq6N_MAF](h$A{p|,
        SDKGetFirstTaskReturnValue = false;
        // Block#: zT7onkhCX2:?vr?-F~Th
        pErrorData = error_data;
        // Block#: 24CJ?P^Z3bjebQDS=DuX
        $('[obj-name="I3Hourglass"]').hide();
      });
  }
  /**
   * Describe this function...
   */
  function SDKShowTask(pVariables, pFields, pOutcomes) {
    // Block#: #6:hB.$%_:eHq+:[`I9p
    if(!pVariables.length && !pFields.length && !pOutcomes.length) {
      // Block#: 6Ii.`@w}:xi?7?-Q_G2q
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(nextProcessAfterCompletion, "EQUAL", 'login')) {
        // Block#: ,vG{=.CW^=?Gq=a[)/](
        let hideScreen = $('.HTML5-deploy-wrapper .Screen:visible');
        hideScreen.hide();
        let showScreen = $('[obj-name="S4Login"]');
        showScreen.show();
        history.pushState({
          'view': 'S4Login'
        }, 'S4Login', 'S4Login');
        hideScreen.triggerHandler('hide');
        showScreen.triggerHandler('show');
      } else {
        // Block#: ?NlSpFBv}zI4S9+?DvgZ
        logInForProcessAndCredentials2(nextProcessAfterCompletion, userID, userPassword);
      }
    } else {
      // Block#: yog,pn!^l4$y{@,:%IP6
      com.fc.JavaScriptDistLib.Dictionary.setDictValue(SDKoutput, 'variables', pVariables);
      // Block#: .W1fk}i|%{/Rf3hxUB8q
      com.fc.JavaScriptDistLib.Dictionary.setDictValue(SDKoutput, 'fields', pFields);
      // Block#: HVUw-{`5@/.R]8M|$/wb
      com.fc.JavaScriptDistLib.Dictionary.setDictValue(SDKoutput, 'outcomes', pOutcomes);
      // Block#: ^*,)#R.%c-%i=2v_wz{#
      setOutcomeAndFieldMapping((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'variables')), 'outcomeAndFieldMapping');
      // Block#: 3pM.9KulE3~]7B_`wr2q
      com.fc.JavaScriptDistLib.Dictionary.setDictValue(SDKoutput, 'outcomeAndFieldMapping', outcomeAndFieldMappingList);
      // Block#: xU9.:vB_vlk}E~nmM~9+
      displayPageEngine();
    }
  }
  /**
   * Describe this function...
   */
  function S7MultipleTextHideObjects() {
    // Block#: {bX)_/qfpC!{iPc.nnF)
    $('[obj-name="L7Title"]').hide(); // Block#: sc;bZ-i[Xo)8oHz/w$]]
    $('[obj-name="B7Continue"]').hide(); // Block#: v{8~*aHr$JteEXShc+V%
    $('[obj-name="B7ContinueStyle"]').hide(); // Block#: rqT`{y{i44|ewA}KDw^t
    $('[obj-name="C7Text1"]').hide(); // Block#: |9WDwcs3,OU!QarwQVxW
    $('[obj-name="C7Text2"]').hide(); // Block#: e#}scenX#fnxk;-i7(Fi
    $('[obj-name="C7Text3"]').hide(); // Block#: [opr!Vs#[w4_1Y-NWff%
    $('[obj-name="C7Text4"]').hide(); // Block#: Wh)r$0#]/1%D^Yz4ppQu
    $('[obj-name="C7Progress"]').hide(); // Block#: w+svp{Zme}I4s{Xx*LM7
    $('[obj-name="C7Parent"]').hide(); // Block#: Q-`/z2SnQEBVfW4ZMFAk
    $('[obj-name="L7Link1"]').hide(); // Block#: 2A;Hz:2}[6Ld`)2(:`x=
    $('[obj-name="L7Link2"]').hide(); // Block#: R`|}?/{?50~TEEUk)n0T
    $('[obj-name="L7TopLink"]').hide(); // Block#: %1C{4F8HOlZ.CZyDn_4Z
    $('[obj-name="L7Info"]').hide(); // Block#: Rfv}!g,-;(u.#,OrV@E$
    $('[obj-name="I7Hourglass"]').hide();
  }
  /**
   * Describe this function...
   */
  function S1DashhboardUpdateScreen() {
    // Block#: B:-@Z_^dK[rU#AhyP)KM
    currentOutcome = getFieldFromListWithKeys((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomeAndFieldMapping')), 'id', 'outcome1', '', '', 'name');
    // Block#: q9r(wMRByIJ*f/mH%}G8
    if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentOutcome, "EQUAL", 'L1Links1')) {
      // Block#: ~s!4/!iB]yFuFhB)Hgh3
      com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L1Links1", (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomes'))[0], 'name')));
    }
    // Block#: M;Tt7CjUX6g0%ZB3j8BV
    currentOutcome = getFieldFromListWithKeys((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomeAndFieldMapping')), 'id', 'outcome2', '', '', 'name');
    // Block#: MxP$TzKVyc+;BW`imA6%
    if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentOutcome, "EQUAL", 'L1Links2')) {
      // Block#: Kh0ZshLe@LO~2_)8f6j4
      com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L1Links2", (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomes'))[1], 'name')));
    }
    // Block#: X6Iklkq`aRsDiO.PCs?i
    currentOutcome = getFieldFromListWithKeys((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomeAndFieldMapping')), 'id', 'outcome3', '', '', 'name');
    // Block#: yCt(F`(=Up[NVffxk1W@
    if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentOutcome, "EQUAL", 'L1Links3')) {
      // Block#: VML_VMRc!uE$?#Oz.^*
      com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L1Links3", (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomes'))[2], 'name')));
    }
    // Block#: 0Ml}4L7~j-eS:^1#JSN@
    currentOutcome = getFieldFromListWithKeys((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomeAndFieldMapping')), 'id', 'outcome4', '', '', 'name');
    // Block#: b%^hL#bw^p6DH^`kx$G*
    if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentOutcome, "EQUAL", 'B1LogOut')) {
      // Block#: q|W79]n38VV+9V]lePmw
      com.fc.JavaScriptDistLib.Button.setProperty["Text"]("B1LogOut", (com.fc.JavaScriptDistLib.TextLib.convertToText(com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomes'))[3], 'name'))));
    }
  }
  /**
   * Describe this function...
   */
  function S6MultipleChoiceUpdateScreen() {
    // Block#: W(bhIT2Y9vVUy:nld{NT
    S6MultipleChoiceHideObjects();
    // Block#: X=dljHD8GSYQKe;`NrLy
    currentProperty = getFieldFromListWithKeys((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'variables')), 'id', 'title', '', '', 'name');
    // Block#: d?sFGU:i7EBCmeWf)=Mg
    if(!!currentProperty.length) {
      // Block#: })Qi?rvRU_]B;/]v!jJ|
      com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L6Title", (com.fc.JavaScriptDistLib.TextLib.convertToText(currentProperty))); // Block#: Y[EQ[~Qn7eekPH]=TY7h
      $('[obj-name="L6Title"]').show();
    }
    // Block#: {s]DX`sE?nZj0*j_d10b
    currentProperty = getFieldFromListWithKeys((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'variables')), 'id', 'progressBar', '', '', 'name');
    // Block#: {oxkL7W[Cb{LL$4om;R?
    if(!!currentProperty.length) {
      // Block#: kT/{$h@AM6PsT^;G:!_T
      com.fc.JavaScriptDistLib.Container.setProperty["width"]("C6ProgressComplete", (setProgressBar(currentProperty, com.fc.JavaScriptDistLib.Container.getProperty["width"]("C6Progress")))); // Block#: 9Key^Q}R84wsPnPvdi0c
      $('[obj-name="C6Progress"]').show();
    }
    // Block#: 9-eZJ~bOeM(02P~!wX4s
    currentProperty = getFieldFromListWithKeys((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'variables')), 'id', 'infoText', '', '', 'name');
    // Block#: m@:yyH?19C[|x`?(?Yj|
    if(!!currentProperty.length) {
      // Block#: .1nG|e/KBzE}{WE^JhkQ
      com.fc.JavaScriptDistLib.Label.setProperty["Text"]("I6Info", (com.fc.JavaScriptDistLib.TextLib.convertToText(currentProperty))); // Block#: pJT^N}V:}/g2%`}oh^SB
      $('[obj-name="I6Info"]').show();
    }
    // Block#: l#O#_$4dL*i+pI=DWfi:
    for(index = 1; index <= 5; index++) {
      // Block#: u{$IQ70Wq}WRZ$h^{E%U
      currentOutcome = getFieldFromListWithKeys((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomeAndFieldMapping')), 'id', String('outcome') + String(com.fc.JavaScriptDistLib.TextLib.convertToText(index)), '', '', 'name');
      // Block#: anZJIKxw,eT_Gbz:4Vq;
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentOutcome, "EQUAL", 'TQL1lblParent')) {
        // Block#: 8M;{L#)Y3!e|S(xS7m?)
        com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L6Parent", (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomes'))[index - 1], 'name'))); // Block#: @%F1]JWxHh)6io+lsNpw
        $('[obj-name="C6Parent"]').show();
      }
      // Block#: -#Fj[k(X?pxt[=($*`rT
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentOutcome, "EQUAL", 'TQL1btn1')) {
        // Block#: :V-SvXAfV?yXR${n{^.C
        com.fc.JavaScriptDistLib.Button.setProperty["Text"]("B6Continue", (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomes'))[index - 1], 'name'))); // Block#: 9sU2;s!eRcZI[`tXYw{U
        $('[obj-name="B6Continue"]').show(); // Block#: b#17+#ah=JFND$u+|_+S
        $('[obj-name="B6ContinueStyle"]').show();
      }
      // Block#: ryH~k!h2F4Lo*evt=AsD
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentOutcome, "EQUAL", 'TQL1lblLink1')) {
        // Block#: ?wqFwf*@e}?yD/x$JI:2
        com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L6Link1", (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomes'))[index - 1], 'name'))); // Block#: fERL+0A/-?*t-{##EjMR
        $('[obj-name="L6Link1"]').show();
      }
      // Block#: `pMp#XC*v6bhYIZL{F}h
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentOutcome, "EQUAL", 'TQL1lblLink2')) {
        // Block#: X+.^L53T-IQ_S2[T0LZ|
        com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L6Link2", (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomes'))[index - 1], 'name'))); // Block#: 8wNP!4a|3%x`().X%:h?
        $('[obj-name="L6Link2"]').show();
      }
      // Block#: FYnZKTZYaFuFLTs4W[Eo
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentOutcome, "EQUAL", 'TQL1lblTopRight')) {
        // Block#: thz~KnB?fc84Ojf3eM*D
        com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L6TopLink", (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomes'))[index - 1], 'name'))); // Block#: /?Q@^MH?#jSRvO0|aRE%
        $('[obj-name="L6TopLink"]').show();
      }
    }
    // Block#: sI+SjTI,F+NqXG;xE{fj
    j = 0;
    // Block#: ].sRJ?`K33FLn]6ACql?
    checkBoxList = [];
    // Block#: JvRDl0j|!_TEdF:jlyzJ
    checkBoxElement = com.fc.JavaScriptDistLib.Dictionary.createEmptyDictionary();;
    // Block#: dUyF5#$D9Kk`%qob_e!A
    if(com.fc.JavaScriptDistLib.MathLibrary.mathCompare((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields')).length - 1, "GTE", 0)) {
      // Block#: Z,S=]iXSfh*9+m?pm6X1
      var index_end4 = (com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields')).length - 1;
      var index_inc4 = 1;
      if(0 > index_end4) {
        index_inc4 = -index_inc4;
      }
      for(index = 0; index_inc4 >= 0 ? index <= index_end4 : index >= index_end4; index += index_inc4) {
        // Block#: t#pK|H*-.`D-ko)([XSK
        currentField = getFieldFromListWithKeys((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomeAndFieldMapping')), 'id', String('field') + String(com.fc.JavaScriptDistLib.TextLib.convertToText((index - j) + 1)), '', '', 'name');
        // Block#: eF-fi*76q*J:9I2?!$!h
        if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'fieldType'), "EQUAL", 'OptionFormField')) {
          // Block#: }$hDzP^_F`Joq$tp^?gh
          var listItem_end = (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'options')).length - 1;
          var listItem_inc = 1;
          if(0 > listItem_end) {
            listItem_inc = -listItem_inc;
          }
          for(listItem = 0; listItem_inc >= 0 ? listItem <= listItem_end : listItem >= listItem_end; listItem += listItem_inc) {
            // Block#: XYM3.O|C{Ae9SPd?,GwX
            if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'value'), "EQUAL", com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'options'))[listItem], 'name'))) {
              // Block#: B%1ze1!9xmYzq?a]Hv^w
              checkBoxValue = 'TRUE';
            } else {
              // Block#: Nu(yi4t|[|7`PQ`ZsXG@
              checkBoxValue = 'FALSE';
            }
            // Block#: GdyywnQ3*Iu$OtCR|3Lk
            checkBoxElement = com.fc.JavaScriptDistLib.Dictionary.createDictionary(['id', 'name', 'value'], [(com.fc.JavaScriptDistLib.TextLib.convertToText(listItem)), (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'options'))[listItem], 'name')), checkBoxValue]);
            // Block#: m7!f9p3DWZ64|)3x-Y1s
            com.fc.JavaScriptDistLib.ListLibrary.listAdd(checkBoxList, checkBoxElement)
            // Block#: u}?0-89g~AXMgt@W6^IN
            $('[obj-name="LV6Choices"]').show();
          }
          // Block#: XEv#_Y4dJ5.VU7v~@/@c
          LVcells = checkBoxList.length;
        } else {
          // Block#: myx:7OL2NkULQMfacVIl
          j = j + 1;
        }
      }
      // Block#: V?tKGXS@hCD5KNA1iJbN
      com.fc.JavaScriptDistLib.ListView.removeAllCells('LV6Choices');
      on_listview_length_configured_LV6Choices();
    }
  }
  /**
   * Describe this function...
   */
  function ForgotPassword() {
    // Block#: 4}7CIY!643z)%:)U1Vj$
    userID = 'forgetfulUser';
    // Block#: ZG(}ou_jHQ@stfmV,qza
    userPassword = '4mn3s14C!';
    // Block#: @M?Xs4?4zM|2=v)W)C,:
    com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L4Info", 'Please Insert e-mail and password to log in'); // Block#: 7E$?-+%D$Id~6-oSBuvO
    com.fc.JavaScriptDistLib.Textbox.setProperty["Text"]("T4Pass", ''); // Block#: ]QT@#3c;dy|R%Gvu-7k$
    $('[obj-name="L4Pass"]').show(); // Block#: 2yLm|nbwFGdhnoSBX4ew
    logInForProcessAndCredentials3('ResetPasswordV1', userID, userPassword);
  }
  /**
   * Describe this function...
   */
  function S7MultipleTextUpdateScreen() {
    // Block#: jgZ):lN/=~*w7Hr,GpEF
    S7MultipleTextHideObjects();
    // Block#: cmu#;wMO{mEyN*189][F
    currentProperty = getFieldFromListWithKeys((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'variables')), 'id', 'title', '', '', 'name');
    // Block#: r8Ot/AfZ|{4)p6X7_b^.
    if(!!currentProperty.length) {
      // Block#: .(b9-3kfilkPDs_McVQV
      com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L7Title", (com.fc.JavaScriptDistLib.TextLib.convertToText(currentProperty))); // Block#: |D.-^3=U/N5:K)Yw2,`g
      $('[obj-name="L7Title"]').show();
    }
    // Block#: Eq_e-7{+$Acr*=}BbvWG
    currentProperty = getFieldFromListWithKeys((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'variables')), 'id', 'progressBar', '', '', 'name');
    // Block#: vE}v6O#9puHugYoU6/:V
    if(!!currentProperty.length) {
      // Block#: d`CZ|StL`o-MH2nc!xtx
      com.fc.JavaScriptDistLib.Container.setProperty["width"]("C7ProgressComplete", (setProgressBar(currentProperty, com.fc.JavaScriptDistLib.Container.getProperty["width"]("C7Progress")))); // Block#: ej+?S?-!W9yFOy]Jz#~o
      $('[obj-name="C7Progress"]').show();
    }
    // Block#: ,v[JB@D{|iwm)zU[E?,g
    currentProperty = getFieldFromListWithKeys((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'variables')), 'id', 'infoText', '', '', 'name');
    // Block#: 4iN2]jT@KhkNW/dR*L}z
    if(!!currentProperty.length) {
      // Block#: @QehWz`XFr2.XeYB@_m9
      com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L7Info", (com.fc.JavaScriptDistLib.TextLib.convertToText(currentProperty))); // Block#: q$-_$89*]?tlE[t5M.DA
      $('[obj-name="L7Info"]').show();
    }
    // Block#: mHk!]yL}7Djer`d#_Bs8
    for(index = 1; index <= 5; index++) {
      // Block#: Sq1UYI,BE{ok?vyy`,qm
      currentOutcome = getFieldFromListWithKeys((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomeAndFieldMapping')), 'id', String('outcome') + String(com.fc.JavaScriptDistLib.TextLib.convertToText(index)), '', '', 'name');
      // Block#: ({hDEWBdGHdH8Nya%od5
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentOutcome, "EQUAL", 'TSC1lblParent')) {
        // Block#: ^%}aj]=j/NdL]OBDJxKu
        com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L7Parent", (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomes'))[index - 1], 'name'))); // Block#: pJy27|_KUwjo:_x.=$mQ
        $('[obj-name="C7Parent"]').show();
      }
      // Block#: k$R;z4;(*wrf[rH|(5QF
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentOutcome, "EQUAL", 'TSC1btn1')) {
        // Block#: @.Dw5.qrG9?3`@#w1R}!
        com.fc.JavaScriptDistLib.Button.setProperty["Text"]("B7Continue", (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomes'))[index - 1], 'name'))); // Block#: ^:/yn*iL6o;x`9Zh{7J:
        $('[obj-name="B7Continue"]').show(); // Block#: 51xJ)$UoXD/IX|9]5{jb
        $('[obj-name="B7ContinueStyle"]').show();
      }
      // Block#: B|bW0Zih@m|8qjZySO#u
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentOutcome, "EQUAL", 'TSC1lblLink1')) {
        // Block#: c?+s`($_MAlZZbHO;C@1
        com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L7Link1", (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomes'))[index - 1], 'name'))); // Block#: _`lQ7Sj]e{}IM$QH?qgP
        $('[obj-name="L7Link1"]').show();
      }
      // Block#: Kt7fs[V{VT!s~=@A8Fjn
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentOutcome, "EQUAL", 'TSC1lblLink2')) {
        // Block#: x.KKu!2a~[J#E`+itEPb
        com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L7Link2", (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomes'))[index - 1], 'name'))); // Block#: }vWP%?9]Zo+J_-~ON6]R
        $('[obj-name="L7Link2"]').show();
      }
      // Block#: E@q~OK70_Q2e#(NJ,d85
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentOutcome, "EQUAL", 'TSC1lblTopRight')) {
        // Block#: tGa)N#AqZirXY/=7}`jI
        com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L7TopLink", (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomes'))[index - 1], 'name'))); // Block#: V[4E}_lB-d(8WH]#QX?m
        $('[obj-name="L7TopLink"]').show();
      }
    }
    // Block#: xK7]j8:McxZB:ZnPwg(-
    j = 0;
    // Block#: Q4@$5mbTYVy-N-6kaUE?
    if(com.fc.JavaScriptDistLib.MathLibrary.mathCompare((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields')).length - 1, "GTE", 0)) {
      // Block#: CJD817gOaK[qxSMnLjP{
      var index_end5 = (com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields')).length - 1;
      var index_inc5 = 1;
      if(0 > index_end5) {
        index_inc5 = -index_inc5;
      }
      for(index = 0; index_inc5 >= 0 ? index <= index_end5 : index >= index_end5; index += index_inc5) {
        // Block#: Nts*n@Rm=VY/f0+rrh4P
        currentField = getFieldFromListWithKeys((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomeAndFieldMapping')), 'id', String('field') + String(com.fc.JavaScriptDistLib.TextLib.convertToText((index - j) + 1)), '', '', 'name');
        // Block#: BQ_Jhpg,H|3+e=O2-,!3
        if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'fieldType'), "EQUAL", 'FormField')) {
          // Block#: cJY};tIV/G+:67.({dxD
          if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentField, "EQUAL", 'TSC1txt1')) {
            // Block#: rcM2n6xK3j)U~kTGzq%L
            com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L7Text1", (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'name'))); // Block#: PkfMWXX0Xod#J3Uz]|M*
            com.fc.JavaScriptDistLib.Textbox.setProperty["Text"]("T7Text1", (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'placeholder'))); // Block#: l2=Xe6Df,iry{|#DfjAQ
            txt1PlaceHolder = com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text1");
            // Block#: 3_3@f_1YH9S8t`$yX)54
            $('[obj-name="C7Text1"]').show();
          }
          // Block#: Z9u?et38,O7/e{6q_?|h
          if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentField, "EQUAL", 'TSC1txt2')) {
            // Block#: 2*3=on~Noy.+`(J|:KOW
            com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L7Text2", (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'name'))); // Block#: %Hvh,PpQ^AS)1;s,P_d/
            com.fc.JavaScriptDistLib.Textbox.setProperty["Text"]("T7Text2", (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'placeholder'))); // Block#: B1f]_rQxwH@~#-{chiOC
            txt2PlaceHolder = com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text2");
            // Block#: `iM;=]Ka*Uqi:a)m(g:s
            $('[obj-name="C7Text2"]').show();
          }
          // Block#: 0%78$I-qdVdf`a-f6d1p
          if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentField, "EQUAL", 'TSC1txt3')) {
            // Block#: k[D]jPit{Z[h#1d?nry;
            com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L7Text3", (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'name'))); // Block#: /`2./8aV!g%%6Msz%!S}
            com.fc.JavaScriptDistLib.Textbox.setProperty["Text"]("T7Text3", (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'placeholder'))); // Block#: 7vq}Qn7G4ij_K?i|J1o^
            txt3PlaceHolder = com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text3");
            // Block#: g1h43/;-8BXhqMd[G;98
            $('[obj-name="C7Text3"]').show();
          }
          // Block#: U%rDb(xvgI!4^|4n+R~J
          if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentField, "EQUAL", 'TSC1txt4')) {
            // Block#: M.x}3cUb:wBty#CKl!h%
            com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L7Text4", (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'name'))); // Block#: :xmGTKvpBEc)b_e]8drT
            com.fc.JavaScriptDistLib.Textbox.setProperty["Text"]("T7Text4", (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'placeholder'))); // Block#: IeTP@wV.!IugYTV(WHf`
            txt4PlaceHolder = com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text4");
            // Block#: Tz?hw=}4l21,y*DeNJw:
            $('[obj-name="C7Text4"]').show();
          }
        } else {
          // Block#: H]/A`D5SRFMS(J./Svqc
          j = j + 1;
        }
      }
    }
  }
  /**
   * Describe this function...
   */
  function updatewrongLogInAttempts() {
    // Block#: RgsG(*JRoppR}SERtIrC
    if(com.fc.JavaScriptDistLib.MathLibrary.mathCompare(numberOfWrongLogInAttempts, "LT", 2)) {
      // Block#: I4F/UE2B!gIl/xmM5:u9
      $('[obj-name="I4Hourglass"]').hide(); // Block#: csr}#?=v-fu6+^~hWoYR
      numberOfWrongLogInAttempts = numberOfWrongLogInAttempts + 1;
      // Block#: dP#5#jP-HZmP*:rO+@i8
      com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L4Info", (['Your entered incorrect log in credentials', '<br>', 'You have ', (com.fc.JavaScriptDistLib.TextLib.convertToText(3 - numberOfWrongLogInAttempts)), ' attempts left'].join('')));
    } else {
      // Block#: btp0gF?-4]k!tJ#Y%EWo
      ForgotPassword();
    }
  }
  /**
   * Describe this function...
   */
  function S6MultipleChoiceHideObjects() {
    // Block#: ,FPpnSQFw`%M:ezYFlWt
    $('[obj-name="L6Title"]').hide(); // Block#: qQ#_+*e]v0k!)ReWq.=1
    $('[obj-name="B6Continue"]').hide(); // Block#: `xh4IduU^%g^1rv}`gpE
    $('[obj-name="B6ContinueStyle"]').hide(); // Block#: v;zMMOq#Hyh$FBMWwxSQ
    $('[obj-name="C6Parent"]').hide(); // Block#: t::@w+^~tcY2(EPJxb_3
    $('[obj-name="C6Progress"]').hide(); // Block#: N:Nck=q4pU#Epo2ofeE^
    $('[obj-name="L6Link1"]').hide(); // Block#: qBzV*U8y-l7rK]1%fM22
    $('[obj-name="I6Info"]').hide(); // Block#: I!aR2rz;?ycVp=D#rRIe
    $('[obj-name="L6Link2"]').hide(); // Block#: JrDz`J8+KQ#XQ1?!i}g-
    $('[obj-name="L6TopLink"]').hide(); // Block#: pf/rUHTQC@sWZca%@rRd
    $('[obj-name="I6Hourglass"]').hide();
  }
  /**
   * Describe this function...
   */
  function printoutList(inputListOfObj) {
    // Block#: aLpZNj6,C{nQZ/8N/?+5
    if(com.fc.JavaScriptDistLib.MathLibrary.mathCompare(inputListOfObj.length, "GT", 0)) {
      // Block#: oa!7k8bDPEV(7Yz{Gq2d
      tempListKey = [];
      // Block#: JNrWv?.{/%v[C^[I+C
      tempListKey = (com.fc.JavaScriptDistLib.Dictionary.getKeys(inputListOfObj[0]));
      // Block#: ]aeoYkEpa;]uy2w`G{*{
      var indexpo1_end = inputListOfObj.length;
      var indexpo1_inc = 1;
      if(1 > indexpo1_end) {
        indexpo1_inc = -indexpo1_inc;
      }
      for(indexpo1 = 1; indexpo1_inc >= 0 ? indexpo1 <= indexpo1_end : indexpo1 >= indexpo1_end; indexpo1 += indexpo1_inc) {
        // Block#: 2pKD9Xfaby,^q%K2D[sf
        var indexpo2_end = tempListKey.length;
        var indexpo2_inc = 1;
        if(1 > indexpo2_end) {
          indexpo2_inc = -indexpo2_inc;
        }
        for(indexpo2 = 1; indexpo2_inc >= 0 ? indexpo2 <= indexpo2_end : indexpo2 >= indexpo2_end; indexpo2 += indexpo2_inc) {
          // Block#: qQO0.yGgXIWg0kG,u3T5
          com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L7RightInfo", ([com.fc.JavaScriptDistLib.Label.getProperty["Text"]("L7RightInfo"), (com.fc.JavaScriptDistLib.Dictionary.getDictValue(inputListOfObj[indexpo1 - 1], tempListKey[indexpo2 - 1])), '  '].join('')));
        }
      }
      // Block#: c]uZ)fy)#4DYMYjKxY;6
      com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L7RightInfo", (String(com.fc.JavaScriptDistLib.Label.getProperty["Text"]("L7RightInfo")) + String('<br>')));
    }
  }
  /**
   * Describe this function...
   */
  function S7MultipleTextFillFields() {
    // Block#: oiLZS3/mHwi,w|S9+=0J
    j = 0;
    // Block#: K%%2ye.kj_IW?5b%]GsE
    if(com.fc.JavaScriptDistLib.MathLibrary.mathCompare((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields')).length, "GT", 0)) {
      // Block#: vyJ7;X:=PEYEI~O?0JNf
      var index_end6 = (com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields')).length - 1;
      var index_inc6 = 1;
      if(0 > index_end6) {
        index_inc6 = -index_inc6;
      }
      for(index = 0; index_inc6 >= 0 ? index <= index_end6 : index >= index_end6; index += index_inc6) {
        // Block#: RirbL1N+z^`+jEiluIB8
        currentField = getFieldFromListWithKeys((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomeAndFieldMapping')), 'id', String('field') + String(com.fc.JavaScriptDistLib.TextLib.convertToText((index - j) + 1)), '', '', 'name');
        // Block#: 5TN)Q14]n/VdmIpSNK7Y
        if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'fieldType'), "EQUAL", 'FormField')) {
          // Block#: ^l=e4cs{4d|[ZxjcARQn
          if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentField, "EQUAL", 'TSC1txt1')) {
            // Block#: yt@n(8{%,;|;vnJcu-7$
            com.fc.JavaScriptDistLib.Dictionary.setDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'value', com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text1"));
          }
          // Block#: 0Q,FZOl+?GbB%oZ~GL?r
          if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentField, "EQUAL", 'TSC1txt2')) {
            // Block#: jsU`b(Is?FUSS:@u#X:.
            com.fc.JavaScriptDistLib.Dictionary.setDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'value', com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text2"));
          }
          // Block#: Op{bSTj[vcV*OB#tn-N:
          if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentField, "EQUAL", 'TSC1txt3')) {
            // Block#: OCqc$!cV5KI{fz[%Sm;u
            com.fc.JavaScriptDistLib.Dictionary.setDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'value', com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text3"));
          }
          // Block#: e`t_^KU7Je%)DLjW!job
          if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentField, "EQUAL", 'TSC1txt4')) {
            // Block#: @_X,1f+6u*4E+.r}K2Iz
            com.fc.JavaScriptDistLib.Dictionary.setDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'value', com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text4"));
          }
        } else {
          // Block#: /sq83kZx)+2^pcBn=Axg
          j = j + 1;
        }
      }
    } else {}
  }
  /**
   * Describe this function...
   */
  function S7MultipleTextCheckRequiredFields() {
    // Block#: UhHyiGpLjhneM*pOM~?8
    currentFieldIsRequired = false;
    // Block#: j0QAI`B$!1d8Jf_TE/;^
    j = 0;
    // Block#: ^2oEE)`[FXfhB/47t,rd
    if(com.fc.JavaScriptDistLib.MathLibrary.mathCompare((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields')).length, "GT", 0)) {
      // Block#: 8`,n(PdxnBBM:G7hVxHo
      var index_end7 = (com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields')).length - 1;
      var index_inc7 = 1;
      if(0 > index_end7) {
        index_inc7 = -index_inc7;
      }
      for(index = 0; index_inc7 >= 0 ? index <= index_end7 : index >= index_end7; index += index_inc7) {
        // Block#: $vboeL1Q,`V.8a/s1,:X
        com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L7Text1", TSC1localCurrentFieldName); // Block#: J0YFq04sVY5RXX@wOr(7
        currentField = getFieldFromListWithKeys((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomeAndFieldMapping')), 'id', String('field') + String(com.fc.JavaScriptDistLib.TextLib.convertToText((index - j) + 1)), '', '', 'name');
        // Block#: ;-G7m_GYH[UMo5yg3769
        if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'fieldType'), "EQUAL", 'FormField')) {
          // Block#: $|osqR;%A0}~1jB_6kM|
          if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'required'), "EQUAL", 'true')) {
            // Block#: Ckkgy,1+r{(N/nZE5dUh
            TSC1localCurrentFieldName = (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'name'));
            // Block#: p1{XASU3Hz~ohPO/kX$*
            TSC1CheckRequiredFieldsRet = String(TSC1localCurrentFieldName) + String(': is required');
            // Block#: CR4k(F]c_yMbBDz;,Xr[
            if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentField, "EQUAL", 'TSC1txt1') &&
              (com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text1"), "EQUAL", txt1PlaceHolder) ||
                !com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text1").length)) {
              // Block#: -}O=k2aTjzvx-M.XqZpX
              com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L7Text1", TSC1CheckRequiredFieldsRet); // Block#: 1h;7?hodOT?paar[.,w=
              currentFieldIsRequired = true;
            } else if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentField, "EQUAL", 'TSC1txt1')) {}
            // Block#: N$L2XozM8B},A)v/.0~p
            if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentField, "EQUAL", 'TSC1txt2') &&
              (com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text2"), "EQUAL", txt2PlaceHolder) ||
                !com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text2").length)) {
              // Block#: ;F$Y9{N[UJoGX,J[T/EJ
              com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L7Text2", TSC1CheckRequiredFieldsRet); // Block#: h=-%h-TWvHX-b!-[*d{C
              currentFieldIsRequired = true;
            } else if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentField, "EQUAL", 'TSC1txt2')) {
              // Block#: {GDgrUmFdn`Eq}b0a)R;
              com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L7Text2", TSC1localCurrentFieldName);
            }
            // Block#: y*rXH]V$uGx|M.xbV*@j
            if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentField, "EQUAL", 'TSC1txt3') &&
              (com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text3"), "EQUAL", txt3PlaceHolder) ||
                !com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text3").length)) {
              // Block#: ej5j$edZI(_CdPZ~|#`w
              com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L7Text3", TSC1CheckRequiredFieldsRet); // Block#: /:.$DM]1xGH{M6-uUIn-
              currentFieldIsRequired = true;
            } else if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentField, "EQUAL", 'TSC1txt3')) {
              // Block#: uJe-9V?ig35zH+p1UDQk
              com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L7Text3", TSC1localCurrentFieldName);
            }
            // Block#: $1!}|0QNsJQEh+B+[..?
            if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentField, "EQUAL", 'TSC1txt4') &&
              (com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text4"), "EQUAL", txt4PlaceHolder) ||
                !com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text4").length)) {
              // Block#: sb@J9kQnO|{%DeDF[otu
              com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L7Text4", TSC1CheckRequiredFieldsRet); // Block#: ,QB.L!m/6=(9D[H5FP!/
              currentFieldIsRequired = true;
            } else if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentField, "EQUAL", 'TSC1txt4')) {
              // Block#: $^7=*!VNkf):nG3}*S?d
              com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L7Text4", TSC1localCurrentFieldName);
            }
          }
        } else {
          // Block#: -/$df5H6|g~U34_;*1RF
          j = j + 1;
        }
      }
    }
    return currentFieldIsRequired;
  }
  /**
   * Describe this function...
   */
  function S6MultipleChoiceFillFields() {
    // Block#: @I`KgrhxWE.H{ceswiJv
    j = 0;
    // Block#: -W5,ziZ3.3M4X:b}@pud
    if(com.fc.JavaScriptDistLib.MathLibrary.mathCompare((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields')).length, "GT", 0)) {
      // Block#: jXF^?5Zua_;W4VS~yrC1
      var index_end8 = (com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields')).length - 1;
      var index_inc8 = 1;
      if(0 > index_end8) {
        index_inc8 = -index_inc8;
      }
      for(index = 0; index_inc8 >= 0 ? index <= index_end8 : index >= index_end8; index += index_inc8) {
        // Block#: -^x731]ClP(x6(]*!EAy
        if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'fieldType'), "EQUAL", 'OptionFormField')) {
          // Block#: jSfSbPaLp7qVQSEi*E1G
          com.fc.JavaScriptDistLib.Dictionary.setDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'value', lastOptionValue);
          // Block#: ~EF=7bN)I;3YDW^,Gr:J
          com.fc.JavaScriptDistLib.Dictionary.setDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[index], 'type', 'string');
        } else {
          // Block#: yhP0NvdXe~iTtmh_^l7z
          j = j + 1;
        }
      }
    } else {}
  }
  /**
   * Describe this function...
   */
  function S5PassUpdateScreen() {
    // Block#: MY=FFn],T2W6q+|zmel2
    currentProperty = getFieldFromListWithKeys((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'variables')), 'id', 'infoText', '', '', 'name');
    // Block#: J_!jAw_*q/NGo7z$d}`C
    if(!!currentProperty.length) {
      // Block#: Yb/;Y72r{b[aPsCz26xn
      com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L5Info", (com.fc.JavaScriptDistLib.TextLib.convertToText(currentProperty)));
    }
    // Block#: uE?VPry0.,QYmu[EDnbj
    currentOutcome = getFieldFromListWithKeys((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomeAndFieldMapping')), 'id', 'outcome1', '', '', 'name');
    // Block#: @`uUYw~1M:_Ei;ucCo56
    if(com.fc.JavaScriptDistLib.TextLib.textComparison(currentOutcome, "EQUAL", 'TPSWbtnContinue')) {
      // Block#: q0KFkw`Q2-#9f^f88D|Y
      com.fc.JavaScriptDistLib.Button.setProperty["Text"]("B5Continue", (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'outcomes'))[0], 'name'))); // Block#: J)N_;?;KM$^Sr{,*]Z*e
      $('[obj-name="B5Continue"]').show();
    }
  }
  // Block#: G1#L8a+aio5j=cVuR0Ar
  function on_Container_C6Parent_CLICK(e) {
    try {
      // Block#: RjaOp;PE_n}ecn.d.{(Q
      $('[obj-name="I6Hourglass"]').show(); // Block#: =d8:R~ojSep+g.x/id#D
      S6MultipleChoiceFillFields();
      // Block#: NC1Jc1nrN^1b^RUqqUAe
      returnError = saveTaskAndNext(com.fc.JavaScriptDistLib.Label.getProperty["Text"]("L6Parent"));
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    };
  };
  $('[obj-name= "C6Parent"]').on('click', on_Container_C6Parent_CLICK);
  // Block#: YnZbfEUT:vHtUp:W3fdr
  function on_Label_L6TopLink_CLICK(e) {
    try {
      // Block#: lSRVdzey|jW:sY+y_ae|
      $('[obj-name="I6Hourglass"]').show(); // Block#: b1~@yhk8//uujVYvc#B$
      S6MultipleChoiceFillFields();
      // Block#: 2Y@[o8%nlgS9Dvf/w;#!
      returnError = saveTaskAndNext(com.fc.JavaScriptDistLib.Label.getProperty["Text"]("L6TopLink"));
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    };
  };
  $('[obj-name= "L6TopLink"]').on('click', on_Label_L6TopLink_CLICK);
  // Block#: .+u1vAW}T2lh$BRMg]G0
  function on_listview_cell_clicked_LVC6Choices(LVC6Choices, number) {
    try {
      // Block#: =~-mjzTi,uUJ}Z~zd{*c
      $('[obj-name="L6Warning"]').hide(); // Block#: _Jz0c.h!~_S~.S``b+**
      if(!!checkBoxList.length) {
        // Block#: 6C2;}y?T`:Xx#=iCJ0rw
        var index_end3 = checkBoxList.length - 1;
        var index_inc3 = 1;
        if(0 > index_end3) {
          index_inc3 = -index_inc3;
        }
        for(index = 0; index_inc3 >= 0 ? index <= index_end3 : index >= index_end3; index += index_inc3) {
          // Block#: XebrT1Qr422(L{eHoLq:
          checkBoxElement = checkBoxList[index];
          // Block#: #s2SJ0*|=gtmW2Di}O|t
          if(com.fc.JavaScriptDistLib.MathLibrary.mathCompare(number, "EQ", index)) {
            // Block#: 7a$BW^e2U=U=Z)SN(`f~
            com.fc.JavaScriptDistLib.Dictionary.setDictValue(checkBoxElement, 'value', 'TRUE');
          } else {
            // Block#: ^B,i|:9WZcLV`GMIS;2c
            com.fc.JavaScriptDistLib.Dictionary.setDictValue(checkBoxElement, 'value', 'FALSE');
          }
          // Block#: aPDe?`G.}a=0By=*6H{3
          checkBoxList[index] = checkBoxElement;
        }
        // Block#: q`d=A(#;3WvC_;7-h;[K
        com.fc.JavaScriptDistLib.ListView.removeAllCells('LV6Choices');
        on_listview_length_configured_LV6Choices();
      }
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    }
  }
  com.fc.JavaScriptDistLib.ListView.setClickCallback('LVC6Choices', on_listview_cell_clicked_LVC6Choices);
  // Block#: wQi`LfM;Zd!nv!$t$P0}
  function on_B6Continue_click(e) {
    try {
      // Block#: ^t~={]9tl4i3URn.M=;d
      if(lastOptionValue != null) {
        // Block#: /%~7rybXT5ZUCw;mY*mO
        $('[obj-name="I6Hourglass"]').show(); // Block#: 6M.umGvd9-lZC.{|oqz8
        S6MultipleChoiceFillFields();
        // Block#: JD#(OX6kSw:;+%rEHe=c
        returnError = saveTaskAndNext(com.fc.JavaScriptDistLib.Button.getProperty["Text"]("B6Continue"));
        // Block#: 8+g[cxmd#BFI@7No%CDg
        $('[obj-name="L6Warning"]').hide(); // Block#: gS;(x7~gNk*084=*yJR@
        lastOptionValue = null;
      } else {
        // Block#: +T}E6sI)fwW(]f~%)[vk
        com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L6Warning", 'Please select an answer to continue'); // Block#: p8F{:FK0C1S)dK/B.uHz
        $('[obj-name="L6Warning"]').show();
      }
      e.stopPropagation();
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    }
  };
  $('[obj-name="B6Continue"]').on('click', on_B6Continue_click);
  // Block#: bL]#_Y,p/1`?njMH#0|=
  function on_Container_C7Parent_CLICK(e) {
    try {
      // Block#: 3v$BT@VKo7Jl)2Bu7[`L
      $('[obj-name="I7Hourglass"]').show(); // Block#: gTkpfwBG8yLnSKz[Hi@5
      if(!com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Label.getProperty["Text"]("L7Parent"), "EQUAL", 'back to LogIn')) {
        // Block#: zvfE#k9bn=aDB):WL~d_
        returnError = saveTaskAndNext(com.fc.JavaScriptDistLib.Label.getProperty["Text"]("L7Parent"));
      } else {
        // Block#: NG~|fo]G21Cn@y):]`dK
        let hideScreen = $('.HTML5-deploy-wrapper .Screen:visible');
        hideScreen.hide();
        let showScreen = $('[obj-name="S4Login"]');
        showScreen.show();
        history.pushState({
          'view': 'S4Login'
        }, 'S4Login', 'S4Login');
        hideScreen.triggerHandler('hide');
        showScreen.triggerHandler('show');
      }
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    };
  };
  $('[obj-name= "C7Parent"]').on('click', on_Container_C7Parent_CLICK);
  // Block#: I`sI;(gAXJ%n%Ic)hMr!
  function on_screen_showS6MultipleChoice() {
    try {
      // Block#: Z=dJS?D;71q51q{SS:lD
      currentScreen = 'TQL1';
      // Block#: 7VCO1hXl$EhGl!83n^53
      $('[obj-name="L6Warning"]').hide(); // Block#: fl*97w#{yv.t9(rMFqGs
      com.fc.JavaScriptDistLib.Image.setProperty["Image"]("I6Hourglass", (com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/e61d073c-141f-4ce0-b7c0-6faaffd73690"))); // Block#: v9do6(qa42yxkT:zd,f(
      checkBoxList = [];
      // Block#: M.C[0@$}Z]EMzPYe=!#*
      checkBoxElement = com.fc.JavaScriptDistLib.Dictionary.createEmptyDictionary();;
      // Block#: XrAm5ON2]d3!8fW#yV36
      LVcells = checkBoxList.length;
      // Block#: qo9u+b;}Dl8A^R[P#XV%
      com.fc.JavaScriptDistLib.ListView.removeAllCells('LV6Choices');
      on_listview_length_configured_LV6Choices();
    } catch(e) {
      com.fc.JavaScriptDistLib.handleException(e);
    }
  };
  $('[obj-name="S6MultipleChoice"]').on('show', on_screen_showS6MultipleChoice);
  com.fc.JavaScriptDistLib.Screen.screenDict['showS6MultipleChoice'] = on_screen_showS6MultipleChoice;
  // Block#: Ow+6*OIg]U9mwQg6-25.
  function on_listview_length_configured_LV6Choices() {
    try {
      com.fc.JavaScriptDistLib.ListView.configureCells('LV6Choices', LVcells);
      $('[obj-name="LV6Choices"]').children().each(function(i) {
        if(i > 0) {
          com.fc.JavaScriptDistLib.ListView.setContext($(this));
          com.fc.JavaScriptDistLib.ListView.executeConfigCallback('LV6Choices', i - 1);
          com.fc.JavaScriptDistLib.ListView.resetContext($(this));
        }
      });
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    }
  };
  // Block#: vjCPQt?{;5?uuej=5=9!
  function on_screen_showS1Dashboard() {
    try {
      // Block#: /zQ@z?E=}gg1)ufXEZFP
      currentScreen = 'S1Dashboard';
      // Block#: K/{XaX-wg?5h;r@+Gg5L
      com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L1Dash", (['<style> @import url(\'https://fonts.googleapis.com/css?family=Montserrat:200,300,600\');  body { font-size: 12px; }  body p { margin: 0px; }  #time-date-wrapper { width: 100%; font-family: \'Montserrat\', sans-serif; color: white; display:table-row; }  .col-left, .col-right { display: table-cell; vertical-align: middle; }  #date { font-size: 6rem; text-align: right; font-weight: 200; }  #month { text-transform: uppercase; letter-spacing: 3px; font-weight: 600; font-size: 1.2rem; }  #day { font-weight: 300; font-size: 2.4rem; }  </style>  <div id="time-date-wrapper"> <div class="col-left"> <p id="date">', (com.fc.JavaScriptDistLib.TextLib.convertToText((com.fc.JavaScriptDistLib.TimeLibrary.componentsFromTime((com.fc.JavaScriptDistLib.TimeLibrary.createTimeNow()), "SMHD"))[0])), '</p> </div> <div class="col-right"> <p id="month">', (com.fc.JavaScriptDistLib.TextLib.convertToText(Months[(com.fc.JavaScriptDistLib.TimeLibrary.componentsFromTime((com.fc.JavaScriptDistLib.TimeLibrary.createTimeNow()), "SMHDM"))[0] - 1])), '</p><p id="day">', (com.fc.JavaScriptDistLib.TimeLibrary.stringDayOfWeekFromDate((com.fc.JavaScriptDistLib.TimeLibrary.createTimeNow()))), '</p></div></div>'].join(''))); // Block#: I*Pu;Bl$M^8y!a:zSK_/
      $('[obj-name="I1Hourglass"]').hide();
    } catch(e) {
      com.fc.JavaScriptDistLib.handleException(e);
    }
  };
  $('[obj-name="S1Dashboard"]').on('show', on_screen_showS1Dashboard);
  com.fc.JavaScriptDistLib.Screen.screenDict['showS1Dashboard'] = on_screen_showS1Dashboard;
  // Block#: #bgP2U9X923ofdQXTRcv
  function on_screen_showS4Login() {
    try {
      // Block#: :6uo-qZOpW3c3G]3a{:R
      $('[obj-name="I4Hourglass"]').hide(); // Block#: od!-cu(LTwxuxZG[Nsp0
      numberOfWrongLogInAttempts = 0;
      // Block#: RRvhp2JyDC~t+V$Uq.%)
      $('[obj-name="C4Email"]').show(); // Block#: hMI]el}PFvURmk9wvaZc
      $('[obj-name="C4Pass"]').show(); // Block#: 3G!m9Q=3;1m531`kzH4H
      currentScreen = 'TLGI';
      // Block#: 0k.JW;=GPa-r5o~;?SCR
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T4Email"), "EQUAL", '')) {
        // Block#: C=vMpxFcY$(`cZJ{9]h7
        $('[obj-name="L4Email"]').show();
      } else {
        // Block#: =kp6F!Vu-%7ZH=[G9X4V
        $('[obj-name="L4Email"]').hide();
      }
      // Block#: -D{@N4j3QQJplhCx0~[@
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T4Pass"), "EQUAL", '')) {
        // Block#: ~--~%mt{,|VKaTX2Vw]z
        $('[obj-name="L4Pass"]').show();
      } else {
        // Block#: DTgojA:|=d.^Eton,_}!
        $('[obj-name="L4Pass"]').hide();
      }
    } catch(e) {
      com.fc.JavaScriptDistLib.handleException(e);
    }
  };
  $('[obj-name="S4Login"]').on('show', on_screen_showS4Login);
  com.fc.JavaScriptDistLib.Screen.screenDict['showS4Login'] = on_screen_showS4Login;
  // Block#: .mq.4El-sj1w~!C=X=pG
  var elemSelector = '[obj-name="T4Email"]';
  $(elemSelector).find("input").on('focus', function(e) {
    // Block#: `|ia8(]%jRip|lQz_}Z5
    $('[obj-name="L4Email"]').hide();
  });
  // Block#: I9,+}TJoiFm$3u-~x%6%
  var elemSelector = '[obj-name="T4Email"]';
  $(elemSelector).find("input").on('blur', function(e) {
    // Block#: W(}m%DPqyb@:KHru#@nv
    if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T4Email"), "EQUAL", '')) {
      // Block#: tt(~0amuUwa)zI1|=v[=
      $('[obj-name="L4Email"]').show();
    } else {
      // Block#: wo4!WwrlAF-X3RgXJN~|
      $('[obj-name="L4Email"]').hide();
    }
  });
  // Block#: T*erhRMecJeDJNsS(Ols
  var elemSelector = '[obj-name="T4Pass"]';
  $(elemSelector).find("input").on('focus', function(e) {
    // Block#: =Ua3O*kc,a|j6H|S#$uw
    $('[obj-name="L4Pass"]').hide();
  });
  // Block#: KNQ/%kc/f.9nG(b2Koj[
  function on_screen_showS7MultipleText() {
    try {
      // Block#: q!b3{Tlbz1OAj[+i;P(6
      currentScreen = 'TSC1';
      // Block#: `IQo34X!fXOdA3|?s^uf
      com.fc.JavaScriptDistLib.Image.setProperty["Image"]("I7Hourglass", (com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/e61d073c-141f-4ce0-b7c0-6faaffd73690"))); // Block#: Nxi|YEo|r(oIDvn3Xfu3
      $('[obj-name="I7Hourglass"]').hide(); // Block#: 7V?Wx1Eu(k$^JF0[@sHb
      if(S7FirstDisplay) {
        // Block#: @_sGH@yzp!`/=b/S|8F^
        S7FirstDisplay = false;
        // Block#: 7V$s)HXYP_N343)TMU9w
        S7MultipleTextUpdateScreen();
      }
    } catch(e) {
      com.fc.JavaScriptDistLib.handleException(e);
    }
  };
  $('[obj-name="S7MultipleText"]').on('show', on_screen_showS7MultipleText);
  com.fc.JavaScriptDistLib.Screen.screenDict['showS7MultipleText'] = on_screen_showS7MultipleText;
  // Block#: qsjC`,!kVx.sbTH~/nZM
  function on_B7Continue_click(e) {
    try {
      // Block#: RQ8~[kV?Op8.yR]eNq_^
      if(!S7MultipleTextCheckRequiredFields()) {
        // Block#: j{[i//`Of4YxWg(lg;_O
        $('[obj-name="I7Hourglass"]').show(); // Block#: }Mb5hd?L4],Vzgr.H9R.
        S7MultipleTextFillFields();
        // Block#: Bqh|[fnP*Ih=)$NzTVy}
        if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Label.getProperty["Text"]("L7Text3"), "EQUAL", 'password')) {
          // Block#: RMKw/Wrhw.UwOta)Pm9/
          userPassword = com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text3");
        }
        // Block#: lj@Na8i,OSOPj20I*sEY
        returnError = saveTaskAndNext(com.fc.JavaScriptDistLib.Button.getProperty["Text"]("B7Continue"));
      }
      e.stopPropagation();
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    }
  };
  $('[obj-name="B7Continue"]').on('click', on_B7Continue_click);
  // Block#: Sd,ne)biuYu~:DaoCt:e
  var elemSelector = '[obj-name="T4Pass"]';
  $(elemSelector).find("input").on('blur', function(e) {
    // Block#: zD|7@nm`HM@CZV1P*WG0
    if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T4Pass"), "EQUAL", '')) {
      // Block#: 61/FSnap!lp%P$a^teQm
      $('[obj-name="L4Pass"]').show();
    } else {
      // Block#: +KYH^n#aJoK=Q=}4)L2]
      $('[obj-name="L4Pass"]').hide();
    }
  });
  // Block#: ~sz5xby4ep_0GX3YJjLR
  var elemSelector = '[obj-name="T7Text1"]';
  $(elemSelector).find("input").on('blur', function(e) {
    // Block#: I$qd/a3F~V42zZowc7K`
    if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text1"), "EQUAL", '')) {
      // Block#: j)mEK^6o6Fy7C[xrn=Di
      com.fc.JavaScriptDistLib.Textbox.setProperty["Text"]("T7Text1", txt1PlaceHolder);
    }
  });
  // Block#: oO(rCp6l7jHX0sA|V5qq
  function on_listview_cell_configured_LVC6Choices(LVC6Choices, number) {
    try {
      // Block#: 7,0*K6H]};oacb+BxME_
      if(checkBoxList != null) {
        // Block#: L]lqfP%CIo^RVwnlAdz(
        if(!!checkBoxList.length) {
          // Block#: j?U_iE%L,qyBmZR=Dn!8
          checkBoxElement = checkBoxList[number];
          // Block#: aF#@(^B+p?=YKi?h+EEn
          if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Dictionary.getDictValue(checkBoxElement, 'value'), "EQUAL", 'FALSE')) {
            // Block#: 4[0ZD~|:uP+rD7M+aIdK
            com.fc.JavaScriptDistLib.Image.setProperty["Image"]("I6Icon", (com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/a2af1fca-66e5-4ec3-ba8a-6fc542da63d9")));
          } else {
            // Block#: -%e[H4@3}zK@Wky~WZ[)
            com.fc.JavaScriptDistLib.Image.setProperty["Image"]("I6Icon", (com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/33d23d80-9a3c-45e3-9942-0bd0dfb6236a"))); // Block#: 0#,9ptmXYZbRz4L0}!0N
            lastOptionValue = (com.fc.JavaScriptDistLib.Dictionary.getDictValue(checkBoxElement, 'name'));
          }
          // Block#: E9:TLRT`g|DdyNzWO_@W
          com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L6Choice", (com.fc.JavaScriptDistLib.Dictionary.getDictValue(checkBoxList[number], 'name')));
        }
      }
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    }
  };
  com.fc.JavaScriptDistLib.ListView.setConfigCallback('LVC6Choices', on_listview_cell_configured_LVC6Choices);
  // Block#: ywTdD!??@D/GbA0B7GRe
  function on_Textbox_T7Text1_CLICK(e) {
    try {
      // Block#: f!u_^@`px2ZQupHqN+[a
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text1"), "EQUAL", txt1PlaceHolder)) {
        // Block#: KiH/mBL]uQ`aBis:X2$6
        com.fc.JavaScriptDistLib.Textbox.setProperty["Text"]("T7Text1", '');
      }
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    };
  };
  $('[obj-name= "T7Text1"]').on('click', on_Textbox_T7Text1_CLICK);
  // Block#: Sn]wB1lhgeEu+1G[WW9G
  function on_B2Login_click(e) {
    try {
      // Block#: |2t.cuPAU3*etCoW-Myh
      initialize();
      // Block#: B;KX/k^x.KTJ/9-Qb^]%
      let hideScreen = $('.HTML5-deploy-wrapper .Screen:visible');
      hideScreen.hide();
      let showScreen = $('[obj-name="S4Login"]');
      showScreen.show();
      history.pushState({
        'view': 'S4Login'
      }, 'S4Login', 'S4Login');
      hideScreen.triggerHandler('hide');
      showScreen.triggerHandler('show');
      e.stopPropagation();
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    }
  };
  $('[obj-name="B2Login"]').on('click', on_B2Login_click);
  // Block#: JID7:IO8a%LL0`Ym_DUS
  function on_Label_L7TopLink_CLICK(e) {
    try {
      // Block#: q7HBmH``KM{e}8~zHGtq
      $('[obj-name="I7Hourglass"]').show(); // Block#: 97`F#K+8[/]uf9fPgGxa
      returnError = saveTaskAndNext(com.fc.JavaScriptDistLib.Label.getProperty["Text"]("L7TopLink"));
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    };
  };
  $('[obj-name= "L7TopLink"]').on('click', on_Label_L7TopLink_CLICK);
  // Block#: Ohhe(lb[7zELE/9JU@~;
  var elemSelector = '[obj-name="T7Text2"]';
  $(elemSelector).find("input").on('blur', function(e) {
    // Block#: |avMVO?=Q_7{FN4r;|KI
    if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text2"), "EQUAL", '')) {
      // Block#: hg%T+C7ME,{FIOiB-fbR
      com.fc.JavaScriptDistLib.Textbox.setProperty["Text"]("T7Text2", txt2PlaceHolder);
    }
  });
  // Block#: a5%H|7FJOY4ucvjgMC45
  function on_B4Login_click(e) {
    try {
      // Block#: +GX07e1-!ieO=(fX#!_!
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T4Email"), "EQUAL", '')) {
        // Block#: ?kla^#:/3W~@D?XODBbw
        $('[obj-name="L4Email"]').show();
      } else {
        // Block#: YDMHtMWQ5}r}$2yt0SJF
        if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T4Pass"), "EQUAL", '')) {
          // Block#: amcw,g`;Sr)..UMJ2J5%
          $('[obj-name="L4Pass"]').show();
        } else {
          // Block#: S7^aN0~-gQfL5uzg-$.J
          $('[obj-name="I4Hourglass"]').show(); // Block#: epJ.iKG=0o=yH?+w:*:B
          com.fc.JavaScriptDistLib.Image.setProperty["Image"]("I4Hourglass", (com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/e61d073c-141f-4ce0-b7c0-6faaffd73690"))); // Block#: Nf*j#~f1}e*Q,-sxPBh)
          userID = com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T4Email");
          // Block#: DnH[Hj}wF=*R}?Rh?aYT
          userPassword = com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T4Pass");
          // Block#: i~,Re^lZYFtL|~3-(,a:
          com.fc.JavaScriptDistLib.Textbox.setProperty["Text"]("T4Pass", ''); // Block#: TD#v$xQ+l*deO[;%rl@R
          $('[obj-name="L4Pass"]').show(); // Block#: lAaF=n#9P80iO().*]-B
          logInForProcessAndCredentials2(firstProcessAtLogIn, userID, userPassword);
        }
      }
      e.stopPropagation();
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    }
  };
  $('[obj-name="B4Login"]').on('click', on_B4Login_click);
  // Block#: 2dtOOYwxwf=33if3`E$(
  function on_Textbox_T7Text2_CLICK(e) {
    try {
      // Block#: Gd:ac:?%yvsa}#Mx:.94
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text2"), "EQUAL", txt2PlaceHolder)) {
        // Block#: 4dy^=i(M3=G)WseVI=o8
        com.fc.JavaScriptDistLib.Textbox.setProperty["Text"]("T7Text2", '');
      }
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    };
  };
  $('[obj-name= "T7Text2"]').on('click', on_Textbox_T7Text2_CLICK);
  // Block#: %4Uh!mt2bsE0}xp3e-TN
  var elemSelector = '[obj-name="T7Text3"]';
  $(elemSelector).find("input").on('blur', function(e) {
    // Block#: p|M~{G?gY8!Gv!*65^-Y
    if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text3"), "EQUAL", '')) {
      // Block#: DuTr-9(8+8$Om=T47_,f
      com.fc.JavaScriptDistLib.Textbox.setProperty["Text"]("T7Text3", txt3PlaceHolder);
    }
  });
  // Block#: 0SDhW!61QA90b@hP31I*
  function on_screen_showS5Pass() {
    try {
      // Block#: [S_kdWyPm?3=#VWY.o
      currentScreen = 'TPSW';
      // Block#: FEv!VXmpg+VNnBv^eM_%
      com.fc.JavaScriptDistLib.Image.setProperty["Image"]("I5Hourglass", (com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/e61d073c-141f-4ce0-b7c0-6faaffd73690"))); // Block#: [~s?I7wNHL0[j,F~N=i6
      $('[obj-name="I5Hourglass"]').hide(); // Block#: F9PXX3/U:*[G]e6[fE_(
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T5Pass"), "EQUAL", '')) {
        // Block#: A*CV=xIw1:b1r:in#ns$
        $('[obj-name="L5Pass"]').show();
      } else {
        // Block#: K!c|N~zVMmbP|$YN;48n
        $('[obj-name="L5Pass"]').hide();
      }
      // Block#: PWqVB6Z_L4^)8K:rlTT)
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T5Confirm"), "EQUAL", '')) {
        // Block#: VCs{|Xj#9.szluT!-yB:
        $('[obj-name="L5Confirm"]').show();
      } else {
        // Block#: t!Z0Xjgtp/am97/?M^zi
        $('[obj-name="L5Confirm"]').hide();
      }
    } catch(e) {
      com.fc.JavaScriptDistLib.handleException(e);
    }
  };
  $('[obj-name="S5Pass"]').on('show', on_screen_showS5Pass);
  com.fc.JavaScriptDistLib.Screen.screenDict['showS5Pass'] = on_screen_showS5Pass;
  // Block#: oJ(-7zGr$)TJ7E9OgG#8
  function on_B2Enroll_click(e) {
    try {
      // Block#: oD~30!RmCv6{#vdWP/1I
      initialize();
      // Block#: M]_Z!Gbn28PO}[q_3=c)
      let hideScreen = $('.HTML5-deploy-wrapper .Screen:visible');
      hideScreen.hide();
      let showScreen = $('[obj-name="S3Verify"]');
      showScreen.show();
      history.pushState({
        'view': 'S3Verify'
      }, 'S3Verify', 'S3Verify');
      hideScreen.triggerHandler('hide');
      showScreen.triggerHandler('show');
      e.stopPropagation();
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    }
  };
  $('[obj-name="B2Enroll"]').on('click', on_B2Enroll_click);
  // Block#: i#);)=xQ3]*kgY9f]v?w
  function on_B4Enroll_click(e) {
    try {
      // Block#: E{D?h9Jg]8)Ph-r:Hy]h
      let hideScreen = $('.HTML5-deploy-wrapper .Screen:visible');
      hideScreen.hide();
      let showScreen = $('[obj-name="S3Verify"]');
      showScreen.show();
      history.pushState({
        'view': 'S3Verify'
      }, 'S3Verify', 'S3Verify');
      hideScreen.triggerHandler('hide');
      showScreen.triggerHandler('show');
      e.stopPropagation();
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    }
  };
  $('[obj-name="B4Enroll"]').on('click', on_B4Enroll_click);
  // Block#: ^+TJTv0#~|Djj!QE3]=l
  function on_Textbox_T7Text3_CLICK(e) {
    try {
      // Block#: a,o*3XgG^hEPg$Pl`gbM
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text3"), "EQUAL", txt3PlaceHolder)) {
        // Block#: }_iTt#h:oIPcpXQNd{j=
        com.fc.JavaScriptDistLib.Textbox.setProperty["Text"]("T7Text3", '');
      }
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    };
  };
  $('[obj-name= "T7Text3"]').on('click', on_Textbox_T7Text3_CLICK);
  // Block#: =/tmP-]-(h=g^(ra!#/S
  function on_screen_showS3Verify() {
    try {
      // Block#: {?udh221!3*zRJi`pQ[V
      currentScreen = 'TFTL';
      // Block#: r.,iSV;a3T7%v4*GI=7f
      $('[obj-name="I3Hourglass"]').hide(); // Block#: -ar?[g-;;[us?_}8*t!e
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T3Code"), "EQUAL", '')) {
        // Block#: QhS.N:H}mUS4ugi6u)nB
        $('[obj-name="L3Code"]').show();
      } else {
        // Block#: _Sp,!^oO(Z-i6{f7Su:X
        $('[obj-name="L3Code"]').hide();
      }
    } catch(e) {
      com.fc.JavaScriptDistLib.handleException(e);
    }
  };
  $('[obj-name="S3Verify"]').on('show', on_screen_showS3Verify);
  com.fc.JavaScriptDistLib.Screen.screenDict['showS3Verify'] = on_screen_showS3Verify;
  // Block#: IN#T7JgEZEkgi]30[7PF
  function on_B1Link1_click(e) {
    try {
      // Block#: _m87:2ZQkJ7G_p3/Q-L^
      returnError = saveTaskAndNext(com.fc.JavaScriptDistLib.Label.getProperty["Text"]("L1Links1"));
      // Block#: q/5M+#HA0K{?z8~@e~tI
      $('[obj-name="I1Hourglass"]').show(); // Block#: ]?71]B188XGUz{J/VlD]
      com.fc.JavaScriptDistLib.Image.setProperty["Image"]("I1Hourglass", (com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/e61d073c-141f-4ce0-b7c0-6faaffd73690")));
      e.stopPropagation();
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    }
  };
  $('[obj-name="B1Link1"]').on('click', on_B1Link1_click);
  // Block#: ;O*CL{D,4ZqeT_nvCIB0
  var elemSelector = '[obj-name="T7Text4"]';
  $(elemSelector).find("input").on('blur', function(e) {
    // Block#: ;HO*1sgY?l/u%,)d:GLn
    if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text4"), "EQUAL", '')) {
      // Block#: S/IBLlWToJs35zSZP4q=
      com.fc.JavaScriptDistLib.Textbox.setProperty["Text"]("T7Text4", txt4PlaceHolder);
    }
  });
  // Block#: _T@%JI|k5SNA3TKR?[!`
  function on_Label_L4ForgotPass_CLICK(e) {
    try {
      // Block#: Ve5Dq.GbP4P.;/e;LX=N
      $('[obj-name="I4Hourglass"]').show(); // Block#: GE8oJY!:OY{@6Q75)(/!
      com.fc.JavaScriptDistLib.Image.setProperty["Image"]("I4Hourglass", (com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/e61d073c-141f-4ce0-b7c0-6faaffd73690"))); // Block#: ^S;K1hVPS38PzJ8KIbPx
      ForgotPassword();
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    };
  };
  $('[obj-name= "L4ForgotPass"]').on('click', on_Label_L4ForgotPass_CLICK);
  // Block#: vs/MP|s[?[26|x5/FwpT
  function on_Textbox_T7Text4_CLICK(e) {
    try {
      // Block#: HugjXu(l,Qun$E+f|^aG
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T7Text4"), "EQUAL", txt4PlaceHolder)) {
        // Block#: F$o89]s9E^[H0N)+sd$!
        com.fc.JavaScriptDistLib.Textbox.setProperty["Text"]("T7Text4", '');
      }
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    };
  };
  $('[obj-name= "T7Text4"]').on('click', on_Textbox_T7Text4_CLICK);
  // Block#: p^quA?9O=|jxH:G%RKG}
  function on_Label_L7Link1_CLICK(e) {
    try {
      // Block#: ;R@*WKJz-n{KuX;,#{+_
      $('[obj-name="I7Hourglass"]').show(); // Block#: ON[w:zF?t$+D2x@Tl}3b
      returnError = saveTaskAndNext(com.fc.JavaScriptDistLib.Label.getProperty["Text"]("L7Link1"));
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    };
  };
  $('[obj-name= "L7Link1"]').on('click', on_Label_L7Link1_CLICK);
  // Block#: ]Qu#@^mX,:Bn0n;7hrUM
  function on_B1Link2_click(e) {
    try {
      // Block#: EJj[/c3~C@*LMe3IUZyQ
      returnError = saveTaskAndNext(com.fc.JavaScriptDistLib.Label.getProperty["Text"]("L1Links2"));
      // Block#: Ee}h!44.wm]!Muk{8|Hi
      $('[obj-name="I1Hourglass"]').show(); // Block#: -|WoC:E%^KT+E-qI$DgO
      com.fc.JavaScriptDistLib.Image.setProperty["Image"]("I1Hourglass", (com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/e61d073c-141f-4ce0-b7c0-6faaffd73690")));
      e.stopPropagation();
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    }
  };
  $('[obj-name="B1Link2"]').on('click', on_B1Link2_click);
  // Block#: t/}0#(/IzU`9tTu?4.fg
  function on_B3Enroll_click(e) {
    try {
      // Block#: oIE*QgVg#MF;,F8}HDv,
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T3Code"), "EQUAL", '')) {
        // Block#: Y-jEC],=HMJZ,i6Fk(b2
        com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L3Code", 'Verification Code is required');
      } else {
        // Block#: ?WF@,eXQo(x?Br~txm/(
        $('[obj-name="I3Hourglass"]').show(); // Block#: T-OgbEbBrvSv$sV:u[u~
        com.fc.JavaScriptDistLib.Image.setProperty["Image"]("I3Hourglass", (com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/e61d073c-141f-4ce0-b7c0-6faaffd73690"))); // Block#: DF064ZfySE9xnz1?3ke[
        initSDKFirstLogIn(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T3Code"));
      }
      e.stopPropagation();
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    }
  };
  $('[obj-name="B3Enroll"]').on('click', on_B3Enroll_click);
  // Block#: MH`Ch@~M5;9qv#5I90^s
  function on_Label_L7Link2_CLICK(e) {
    try {
      // Block#: NU[P0H)lKj93/(UX6PEL
      $('[obj-name="I7Hourglass"]').show(); // Block#: W!nd0C`5_hxt!iZxQyMr
      returnError = saveTaskAndNext(com.fc.JavaScriptDistLib.Label.getProperty["Text"]("L7Link2"));
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    };
  };
  $('[obj-name= "L7Link2"]').on('click', on_Label_L7Link2_CLICK);
  // Block#: g=k~43cLZ8L;[~Gw_)vL
  function on_B1Link3_click(e) {
    try {
      // Block#: ;5]aa0~wcG5(:_8`swPr
      returnError = saveTaskAndNext(com.fc.JavaScriptDistLib.Label.getProperty["Text"]("L1Links3"));
      // Block#: 2SC%?~K*X5S$3Ql.mM-M
      $('[obj-name="I1Hourglass"]').show(); // Block#: }`2W5_zBc`W.ogEY,#Hz
      com.fc.JavaScriptDistLib.Image.setProperty["Image"]("I1Hourglass", (com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/e61d073c-141f-4ce0-b7c0-6faaffd73690")));
      e.stopPropagation();
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    }
  };
  $('[obj-name="B1Link3"]').on('click', on_B1Link3_click);
  // Block#: MFA(y`l*l/Ex:o~1b(E`
  function on_B5Continue_click(e) {
    try {
      // Block#: HhA,Yt#6CKD!$[V77E1c
      if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T5Pass"), "EQUAL", com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T5Confirm"))) {
        // Block#: LWn{Ix0DNZ^#wx;xux#m
        $('[obj-name="I5Hourglass"]').show(); // Block#: 1rFY-!%g%GniC.Crv;Oo
        com.fc.JavaScriptDistLib.Image.setProperty["Image"]("I5Hourglass", (com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/e61d073c-141f-4ce0-b7c0-6faaffd73690"))); // Block#: H}0QZ,;6QQ7ueGd9K4}b
        userPassword = com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T5Pass");
        // Block#: f?@M}PlEy?3uB.8Yg?b}
        com.fc.JavaScriptDistLib.Dictionary.setDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[0], 'value', com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T5Pass"));
        // Block#: 4Kdg=ICV5Iw0iYmg#}Wl
        com.fc.JavaScriptDistLib.Dictionary.setDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(SDKoutput, 'fields'))[1], 'value', com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T5Pass"));
        // Block#: f[:L~qD;w(?L_3cT5ArO
        returnError = saveTaskAndNext(com.fc.JavaScriptDistLib.Button.getProperty["Text"]("B5Continue"));
      } else {
        // Block#: U/-?DRFzy$HttW-+pd;C
        com.fc.JavaScriptDistLib.Label.setProperty["Text"]("L5Info", 'The passwords entered do not match. Please try entering them again.');
      }
      e.stopPropagation();
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    }
  };
  $('[obj-name="B5Continue"]').on('click', on_B5Continue_click);
  // Block#: !]@i6+rTpVw*(Kwi,DMH
  function on_B1LogOut_click(e) {
    try {
      // Block#: SM1G8C;USuN7hNX4:76*
      returnError = saveTaskAndNext(com.fc.JavaScriptDistLib.Button.getProperty["Text"]("B1LogOut"));
      // Block#: 0-[;zGENQ}ZzT:obuY4x
      $('[obj-name="I1Hourglass"]').show(); // Block#: c=J8$8lqLUtQN$Uz{uK5
      com.fc.JavaScriptDistLib.Image.setProperty["Image"]("I1Hourglass", (com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("https://staging.snapp.click/api/v2/raws/projects/resources/e61d073c-141f-4ce0-b7c0-6faaffd73690")));
      e.stopPropagation();
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    }
  };
  $('[obj-name="B1LogOut"]').on('click', on_B1LogOut_click);
  // Block#: /G.3IzpPr}Wg]XM3nxEx
  function on_B3Login_click(e) {
    try {
      // Block#: qD@3{Fn,I^%hf%b`R3pq
      let hideScreen = $('.HTML5-deploy-wrapper .Screen:visible');
      hideScreen.hide();
      let showScreen = $('[obj-name="S4Login"]');
      showScreen.show();
      history.pushState({
        'view': 'S4Login'
      }, 'S4Login', 'S4Login');
      hideScreen.triggerHandler('hide');
      showScreen.triggerHandler('show');
      e.stopPropagation();
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    }
  };
  $('[obj-name="B3Login"]').on('click', on_B3Login_click);
  // Block#: `;kEeM6ri+Id|@KQWP`j
  var elemSelector = '[obj-name="T3Code"]';
  $(elemSelector).find("input").on('focus', function(e) {
    // Block#: =/7?X5Z|qdbCJKhrtH)p
    $('[obj-name="L3Code"]').hide();
  });
  // Block#: V3-V=2-_:6PC,GDOe]Mh
  var elemSelector = '[obj-name="T3Code"]';
  $(elemSelector).find("input").on('blur', function(e) {
    // Block#: qje+2}!]v9!~FTsm?+b|
    if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T3Code"), "EQUAL", '')) {
      // Block#: $dnd}7pNDJ9RUaAVRssj
      $('[obj-name="L3Code"]').show();
    }
  });
  // Block#: jNiLOuB|wZZdtK!ULdj9
  var elemSelector = '[obj-name="T5Pass"]';
  $(elemSelector).find("input").on('focus', function(e) {
    // Block#: OZYl82Zj[,[g2c7H8ssN
    $('[obj-name="L5Pass"]').hide();
  });
  // Block#: =k}r24!e;]8}K;JR)dW:
  var elemSelector = '[obj-name="T5Confirm"]';
  $(elemSelector).find("input").on('focus', function(e) {
    // Block#: LrA+s^^v4~LNQLr}[a]V
    $('[obj-name="L5Confirm"]').hide();
  });
  // Block#: a^-GI4}~1WNcev;G1=)e
  var elemSelector = '[obj-name="T5Pass"]';
  $(elemSelector).find("input").on('blur', function(e) {
    // Block#: K^I8up8lz$W[*Dzh`=Zn
    if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T5Pass"), "EQUAL", '')) {
      // Block#: liD8w33!d+b?s]^kaRG^
      $('[obj-name="L5Pass"]').show();
    }
  });
  // Block#: *IMx!`vqm2S!%9::)?ey
  var elemSelector = '[obj-name="T5Confirm"]';
  $(elemSelector).find("input").on('blur', function(e) {
    // Block#: )i6|-uD]Q*hOWw__f*=4
    if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Textbox.getProperty["Text"]("T5Confirm"), "EQUAL", '')) {
      // Block#: B+ESrBprQ~SBFP%~oEJx
      $('[obj-name="L5Confirm"]').show();
    }
  });
  com.fc.JavaScriptDistLib.Screen.screenPopInit();
  com.fc.JavaScriptDistLib.SnappClinical.configure('{"api":{"url":"","username":"","password":"","userid":""}}');
  $('[obj-name="S2Main"]').show();
});
// Generated by snapp
// 954877-660288-355165-915808
