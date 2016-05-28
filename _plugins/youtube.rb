class YouTube < Liquid::Tag
  Syntax = /^\s*([^\s]+)(\s+(\d+)\s+(\d+)\s*)?/

  def initialize(tagName, markup, tokens)
    super

    if markup =~ Syntax then
      @id = $1

      if $2.nil? then
          @width = 560
          @height = 315
      else
          @width = $2.to_i
          @height = $3.to_i
      end
    else
      raise "No YouTube ID provided in the \"youtube\" tag"
    end
  end

  def lookup(context, name)
    lookup = context
    name.split(".").each { |value| lookup = lookup[value] }
    lookup
  end

  def render(context)
    is_amp = lookup(context, 'page.amp')
    if is_amp.nil? then
      output = "<p class=\"youtube-embed\"><iframe width=\"#{@width}\" height=\"#{@height}\" src=\"https://www.youtube.com/embed/#{@id}\" frameborder=\"0\" allowfullscreen></iframe></p>"
    else
      output = "<amp-youtube data-videoid=\"#{@id}\" layout=\"responsive\" width=\"480\" height=\"270\"></amp-youtube>"
    end
    output
  end

  Liquid::Template.register_tag "youtube", self
end
