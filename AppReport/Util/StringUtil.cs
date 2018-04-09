

using System;
using System.Linq;

namespace AppReport.Util
{
    public static class StringUtil
    {  
        public static string[] SplitByComma(this string source)
        {
            if (!string.IsNullOrEmpty(source))
            {
                return source.Split(',');
            }
            return null;
        }

        public static int[] ToIntList(this string[] source)
        {
            if (source != null 
                &&  source.Length > 0)
            {
                return source.Select(x => Convert.ToInt32(x))?.ToArray();
            }
            return null;
        }
    }
}
