import encodeurl from 'encodeurl';
import { ChromeProxy } from '../model/ChromeProxy';
import { trimSymbols } from '../tools/trimSymbols';

const debug = require('cth-debug')(__filename);

export function handleTcRequest (info, tab) {
   debug.log(`item ${info.menuItemId} was clicked`);
   debug.log(`info: ${JSON.stringify(info, 0, 3)}`);
   debug.log(`tab: ${JSON.stringify(tab, 0, 3)}`);

   ChromeProxy.tabs.sendMessage(tab.id, "tcLookup", (res) => {
      const phraseToSearch = trimSymbols(res.payload);

      const adjustedPhraseToSearch = encodeurl(phraseToSearch.replace(/&/g, "%26"));

      debug.warn(res);
      const url = `https://www.google.com/transconsole/externaltc/btviewer/searchresult?SearchText=${adjustedPhraseToSearch}&SearchField=search_field_src&SearchType=search_type_exact&ProductSelect=&LanguagesSelected=${res.language}&TranslationFilterStatus=translated&TranslationFilterAnyOrAll=any&TranslationFilterStage=LEVERAGED&ShowTranslationStage=showTranslationStage&CreatedAfter=&CreatedBefore=&ResourcesFilter=&IncludeObsolete=obsolete`;
      window.open(url);
   });
}