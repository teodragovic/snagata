require "rubygems"
require "bundler/setup"
require "stringex"

## -- Configs -- ##

deploy_branch   = "gh-pages"
deploy_dir      = "_deploy"   # deploy directory (for Github pages deployment)
public_dir      = "_site"     # build directory
posts_dir       = "_posts"    # directory for blog files
new_post_ext    = "md"        # default new post file extension when using the new_post task

#######################
# Working with Jekyll #
#######################

desc "Generate jekyll site"
task :build do
  puts "## Generating Site with Jekyll"
  system "jekyll build"
end

desc "Watch the site and regenerate when it changes"
task :serve do
  puts "Starting to watch source with Jekyll."
  system "jekyll serve --limit_posts 10"
end

# usage rake post[my-new-post] or rake post['my new post']
desc "Create a new post in #{posts_dir}"
task :post, :title do |t, args|
  if args.title
    title = args.title
  else
    title = get_stdin("Enter a title for your post: ")
  end
  # mkdir_p "#{posts_dir}"
  filename = "#{posts_dir}/#{Time.now.strftime('%Y-%m-%d')}-#{title.to_url}.#{new_post_ext}"
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end
  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/&/,'&amp;')}\""
    post.puts "date: #{Time.now.strftime('%Y-%m-%d')}"
    post.puts "grade:"
    post.puts "---"
  end
end

##############
# Deploying  #
##############

desc "Generate website and deploy"
task :deploy => [:build, :push] do
end

desc "Deploy public directory to github pages"
multitask :push do
  puts "## Deploying branch to Github Pages "
  FileUtils.rm_rf(Dir.glob("#{deploy_dir}/*"))
  # (Dir["#{deploy_dir}/*"]).each { |f| rm_rf(f) }
  puts "\n## copying #{public_dir} to #{deploy_dir}"
  cp_r "#{public_dir}/.", deploy_dir
  cd "#{deploy_dir}" do
    system "git add ."
    system "git add -u"
    message = "Site updated at #{Time.now.utc}"
    puts "\n## Commiting: #{message}"
    system "git commit -m \"#{message}\""
    puts "\n## Pushing generated #{deploy_dir} website"
    system "git push origin #{deploy_branch} --force"
    puts "\n## Github Pages deploy complete"
  end
end

def get_stdin(message)
  print message
  STDIN.gets.chomp
end

def ask(message, valid_options)
  if valid_options
    answer = get_stdin("#{message} #{valid_options.to_s.gsub(/"/, '').gsub(/, /,'/')} ") while !valid_options.include?(answer)
  else
    answer = get_stdin(message)
  end
  answer
end

desc "list tasks"
task :list do
  puts "\n## Rake tasks:\n"
  system "Rake -T"
end
