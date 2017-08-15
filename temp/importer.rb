require "jekyll-import";
    JekyllImport::Importers::WordPress.run({
      "dbname"   => "cl58-a-wordp-omb",
      "user"     => "cl58-a-wordp-omb",
      "password" => "6R2^^D2Ud",
      "host"     => "multishiv19.com",
      "port"     => "3306",
      "socket"   => "",
      "table_prefix"   => "smdl5m_",
      "site_prefix"    => "",
      "clean_entities" => true,
      "comments"       => true,
      "categories"     => true,
      "tags"           => true,
      "more_excerpt"   => true,
      "more_anchor"    => true,
      "extension"      => "html",
      "status"         => ["publish"]
    })