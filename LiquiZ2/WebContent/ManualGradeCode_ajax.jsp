
  <%= org.adastraeducation.liquiz.util.Util.standardAJAXHeader(session) %>
  sel: ['1', 'poorly named variable',    '2', 'bad logic',     '3', 'should be initialized',
        '4', 'strange logic',    '5', 'this could be simpler',     '6', '???'
        ],
  code: 'public class test {\n  private int x;\n  public test() {}\n  private char q = \'a\';\n}'
};